import { VehicleMap } from './components/VehicleMap';
import { useVehiclePositionUpdates } from './hooks/useVehiclePositionUpdates';
import './App.css'

function App() {
  // Use the custom hook to get vehicles with automatic updates every 30 seconds
  const { 
    vehicles, 
    lastUpdateTime, 
    isPolling, 
    stopPolling, 
    startPolling,
    refreshNow 
  } = useVehiclePositionUpdates(30000); // 30 seconds

  return (
    <div>
      <VehicleMap 
        vehicles={vehicles}
        lastUpdateTime={lastUpdateTime}
        isPolling={isPolling}
        onTogglePolling={isPolling ? stopPolling : startPolling}
        onRefresh={refreshNow}
      />
    </div>
  );
}

export default App
