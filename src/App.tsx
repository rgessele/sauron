import { VehicleMap } from './components/VehicleMap';
import { sampleVehicles } from './data/sampleVehicles';
import './App.css'

function App() {
  return <VehicleMap vehicles={sampleVehicles} />;
}

export default App
