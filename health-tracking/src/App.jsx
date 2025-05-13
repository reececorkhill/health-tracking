import './App.css'
import TrackingModal from './components/Modals/TrackingModal.jsx'
import Home from './pages/Home/Home.jsx'
import SelectTracking from './pages/SelectTracking/SelectTracking.jsx'
import Tracking from './pages/TrackingHistory/TrackingHistory.jsx'

function App() {
  return (
    <>
      {/* <Home /> */}
      <SelectTracking />
      <TrackingModal />
      {/* <Tracking /> */}
    </>
  )
}

export default App