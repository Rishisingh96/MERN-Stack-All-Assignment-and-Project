import './App.css'
import FetchConfig from './components/FetchConfig'
import UpdateRemark from './components/UpdateRemark'

function App() {
  return (
    <div className="app-container">
      <h1>Config Manager</h1>
      <FetchConfig />
      <UpdateRemark />
    </div>
  )
}

export default App
