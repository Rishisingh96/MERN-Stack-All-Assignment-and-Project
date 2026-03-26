import { useState } from 'react'

const API_BASE = 'http://localhost:3000/api'

export default function UpdateRemark() {
  const [configId, setConfigId] = useState('')
  const [remark, setRemark] = useState('')
  const [status, setStatus] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    setStatus('Updating...')

    const trimmedId = configId.trim()
    const trimmedRemark = remark.trim()

    if (!trimmedId) {
      setStatus('Please enter configId')
      return
    }

    if (!trimmedRemark) {
      setStatus('Please enter remark')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/configurations/${encodeURIComponent(trimmedId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remark: trimmedRemark }),
      })

      if (!res.ok) {
        const errInfo = await res.json().catch(() => ({}))
        throw new Error(errInfo.message || `${res.status} ${res.statusText}`)
      }

      const info = await res.json()
      if (info.message === 'success') {
        setStatus('Remark updated successfully.')
      } else {
        setStatus(`Unexpected response: ${JSON.stringify(info)}`)
      }
    } catch (err) {
      setStatus(`Update failed: ${err.message}`)
    }
  }

  return (
    <section className="card">
      <h2>Update Remark</h2>
      <form onSubmit={handleUpdate} className="form">
        <label>
          Config To Update (configId):
          <input
            type="text"
            value={configId}
            onChange={(e) => setConfigId(e.target.value)}
            required
          />
        </label>

        <label>
          Remark:
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={4}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <div className="output">
        <p>
          Endpoint: <code>{`PUT ${API_BASE}/configurations/{id}`}</code>
        </p>
        <p>Status: {status}</p>
      </div>
    </section>
  )
}
