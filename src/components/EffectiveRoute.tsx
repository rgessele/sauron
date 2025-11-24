import { useMemo } from 'react';
import { Polyline } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { RegistroPassagem } from '../types/registroPassagem';
import { passageRecordDB } from '../data/passageRecordGenerator';

interface EffectiveRouteProps {
  vehicleId: string;
}

export const EffectiveRoute: React.FC<EffectiveRouteProps> = ({ vehicleId }) => {
  const routeCoordinates = useMemo<LatLngExpression[]>(() => {
    // Get all passage records for this vehicle
    const vehicleIdNum = parseInt(vehicleId, 10);
    const passageRecords: RegistroPassagem[] = passageRecordDB.getVehicleHistory(vehicleIdNum);

    if (passageRecords.length === 0) {
      return [];
    }

    // Sort records by timestamp to ensure correct route order
    const sortedRecords = [...passageRecords].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    // Convert to LatLngExpression format
    return sortedRecords.map(record => [
      record.latitude,
      record.longitude,
    ]);
  }, [vehicleId]);

  if (routeCoordinates.length < 2) {
    return null;
  }

  return (
    <Polyline
      positions={routeCoordinates}
      pathOptions={{
        color: '#dc2626',
        weight: 3,
        opacity: 0.8,
      }}
    />
  );
};
