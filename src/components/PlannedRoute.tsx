import { useMemo } from 'react';
import { Polyline } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { MDFe } from '../types/vehicle';
import { paranaHighwayRoutes } from '../data/paranaHighwayRoutes';

interface PlannedRouteProps {
  mdfe: MDFe;
}

// Function to find coordinates for a city from highway routes
function findCityCoordinates(cityName: string): LatLngExpression | null {
  // Clean city name (remove /PR suffix if present)
  const cleanCityName = cityName.replace(/\/PR$/, '').trim().toLowerCase();
  
  // Search through all highway routes for matching city
  for (const route of paranaHighwayRoutes) {
    const point = route.find(p => p.name.toLowerCase() === cleanCityName);
    if (point) {
      return [point.latitude, point.longitude];
    }
  }
  
  return null;
}

export const PlannedRoute: React.FC<PlannedRouteProps> = ({ mdfe }) => {
  const routeCoordinates = useMemo<LatLngExpression[]>(() => {
    if (!mdfe.route || mdfe.route.length === 0) {
      return [];
    }

    const coordinates: LatLngExpression[] = [];

    // Convert each city in the route to coordinates
    for (const city of mdfe.route) {
      const coords = findCityCoordinates(city);
      if (coords) {
        coordinates.push(coords);
      } else {
        console.warn(`Could not find coordinates for city: ${city}`);
      }
    }

    return coordinates;
  }, [mdfe.route]);

  if (routeCoordinates.length < 2) {
    return null;
  }

  return (
    <Polyline
      positions={routeCoordinates}
      pathOptions={{
        color: '#2563eb',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10',
      }}
    />
  );
};
