// Passage record type matching the database schema
export interface RegistroPassagem {
  id: number;
  veiculo_id: number;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

// Route point representing a location along a highway
export interface RoutePoint {
  name: string;
  latitude: number;
  longitude: number;
}
