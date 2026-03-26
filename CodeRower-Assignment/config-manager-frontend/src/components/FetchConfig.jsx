import { useState } from 'react'

const API_BASE = 'http://localhost:3000/api'

export default function FetchConfig() {
  const [configId, setConfigId] = useState('')
  const [fetchedMatrix, setFetchedMatrix] = useState(null)
  const [status, setStatus] = useState('')

  const handleFetch = async (e) => {
    e.preventDefault()
    setStatus('Loading...')
    setFetchedMatrix(null)

    const trimmedId = configId.trim()
    if (!trimmedId) {
      setStatus('Please enter configId')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/configurations/${encodeURIComponent(trimmedId)}`)
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      setFetchedMatrix(data)
      setStatus('Fetched successfully.')
    } catch (err) {
      setStatus(`Fetch failed: ${err.message}`)
    }
  }

  return (
    <section className="card">
      <h2>Fetch Config</h2>
      <form onSubmit={handleFetch} className="form">
        <label>
          Config To Load (configId):
          <input
            type="text"
            value={configId}
            onChange={(e) => setConfigId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div className="output">
        <p>
          Endpoint: <code>{`GET ${API_BASE}/configurations/{id}`}</code>
        </p>
        <p>Status: {status}</p>
        {Array.isArray(fetchedMatrix) && (
          <div className="matrix">
            {fetchedMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.join(', ')}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
