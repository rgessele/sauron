import { useState, useEffect, useCallback, useRef } from 'react';
import type { Vehicle } from '../types/vehicle';
import { generateVehiclesFromPassageRecords, passageRecordDB } from '../data/passageRecordGenerator';

// Initialize vehicles on first render
const initializeVehicles = (): Vehicle[] => {
  passageRecordDB.resetQueryTime();
  const vehicles = generateVehiclesFromPassageRecords();
  console.log(`[Vehicle Updates] Loaded ${vehicles.length} vehicles`);
  return vehicles;
};

// Hook to manage vehicle position updates from passage records
// Simulates polling a database every 30 seconds for new passage records
export function useVehiclePositionUpdates(pollingInterval: number = 30000) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initializeVehicles);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  // Update vehicle positions based on latest passage records
  const updateVehiclePositions = useCallback(() => {
    console.log('[Vehicle Updates] Polling for new passage records...');
    
    // Simulate database query for new records
    const newRecords = passageRecordDB.queryNewRecords();
    
    if (newRecords.length > 0) {
      console.log(`[Vehicle Updates] Found ${newRecords.length} new passage records`);
      
      // Generate updated vehicle list with new positions
      const updatedVehicles = generateVehiclesFromPassageRecords();
      setVehicles(updatedVehicles);
      setLastUpdateTime(new Date());
      
      console.log(`[Vehicle Updates] Updated positions for ${updatedVehicles.length} vehicles`);
    } else {
      console.log('[Vehicle Updates] No new records found');
    }
  }, []);

  // Start polling
  const startPolling = useCallback(() => {
    setIsPolling(true);
    console.log(`[Vehicle Updates] Started polling (interval: ${pollingInterval}ms)`);
  }, [pollingInterval]);

  // Stop polling
  const stopPolling = useCallback(() => {
    setIsPolling(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    console.log('[Vehicle Updates] Stopped polling');
  }, []);

  // Manual refresh
  const refreshNow = useCallback(() => {
    console.log('[Vehicle Updates] Manual refresh triggered');
    updateVehiclePositions();
  }, [updateVehiclePositions]);

  // Set up polling interval
  useEffect(() => {
    if (isPolling) {
      intervalRef.current = setInterval(() => {
        updateVehiclePositions();
      }, pollingInterval);

      console.log(`[Vehicle Updates] Polling interval set to ${pollingInterval}ms`);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPolling, pollingInterval, updateVehiclePositions]);

  return {
    vehicles,
    lastUpdateTime,
    isPolling,
    startPolling,
    stopPolling,
    refreshNow,
  };
}
