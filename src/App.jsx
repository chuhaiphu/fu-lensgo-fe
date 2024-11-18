import { BrowserRouter as Router } from 'react-router-dom'
import RouteElements from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Router>
        <RouteElements />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
