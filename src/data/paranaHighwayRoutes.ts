import type { RoutePoint } from '../types/registroPassagem';

// Major highway routes in Paraná state
// These routes represent real highways where vehicles would be monitored
export const paranaHighwayRoutes: RoutePoint[][] = [
  // BR-277: Paranaguá - Curitiba - Foz do Iguaçu
  [
    { name: 'Paranaguá', latitude: -25.5161, longitude: -48.5227 },
    { name: 'Morretes', latitude: -25.4747, longitude: -48.8328 },
    { name: 'Curitiba', latitude: -25.4284, longitude: -49.2733 },
    { name: 'São José dos Pinhais', latitude: -25.5347, longitude: -49.2064 },
    { name: 'Balsa Nova', latitude: -25.5828, longitude: -49.6364 },
    { name: 'Ponta Grossa', latitude: -25.0946, longitude: -50.1639 },
    { name: 'Guarapuava', latitude: -25.3905, longitude: -51.4578 },
    { name: 'Laranjeiras do Sul', latitude: -25.4075, longitude: -52.4156 },
    { name: 'Cascavel', latitude: -24.9578, longitude: -53.4590 },
    { name: 'Foz do Iguaçu', latitude: -25.5477, longitude: -54.5882 },
  ],
  // BR-376: Curitiba - Ponta Grossa - Apucarana
  [
    { name: 'Curitiba', latitude: -25.4284, longitude: -49.2733 },
    { name: 'Almirante Tamandaré', latitude: -25.3247, longitude: -49.3108 },
    { name: 'Campo Largo', latitude: -25.4597, longitude: -49.5275 },
    { name: 'Ponta Grossa', latitude: -25.0946, longitude: -50.1639 },
    { name: 'Carambeí', latitude: -24.9175, longitude: -50.0978 },
    { name: 'Telêmaco Borba', latitude: -24.3247, longitude: -50.6156 },
    { name: 'Apucarana', latitude: -23.5511, longitude: -51.4608 },
  ],
  // BR-369: Cascavel - Toledo - Marechal Cândido Rondon
  [
    { name: 'Cascavel', latitude: -24.9578, longitude: -53.4590 },
    { name: 'Toledo', latitude: -24.7136, longitude: -53.7428 },
    { name: 'Marechal Cândido Rondon', latitude: -24.5556, longitude: -54.0561 },
    { name: 'Guaíra', latitude: -24.0814, longitude: -54.2564 },
  ],
  // BR-373: Ponta Grossa - Candói
  [
    { name: 'Ponta Grossa', latitude: -25.0946, longitude: -50.1639 },
    { name: 'Palmeira', latitude: -25.4269, longitude: -50.0069 },
    { name: 'Irati', latitude: -25.4686, longitude: -50.6511 },
    { name: 'Guarapuava', latitude: -25.3905, longitude: -51.4578 },
    { name: 'Candói', latitude: -25.5672, longitude: -52.0347 },
  ],
  // BR-158: Francisco Beltrão - Pato Branco
  [
    { name: 'Francisco Beltrão', latitude: -26.0819, longitude: -53.0547 },
    { name: 'Marmeleiro', latitude: -26.1422, longitude: -53.0311 },
    { name: 'Pato Branco', latitude: -26.2286, longitude: -52.6708 },
    { name: 'Clevelândia', latitude: -26.4117, longitude: -52.3478 },
  ],
  // BR-487: Campo Mourão - Umuarama
  [
    { name: 'Campo Mourão', latitude: -24.0456, longitude: -52.3828 },
    { name: 'Goioerê', latitude: -24.1842, longitude: -53.0297 },
    { name: 'Umuarama', latitude: -23.7647, longitude: -53.3250 },
    { name: 'Cruzeiro do Oeste', latitude: -23.7858, longitude: -53.0747 },
  ],
  // BR-369: Londrina - Apucarana - Maringá
  [
    { name: 'Londrina', latitude: -23.3040, longitude: -51.1699 },
    { name: 'Cambé', latitude: -23.2758, longitude: -51.2778 },
    { name: 'Rolândia', latitude: -23.3103, longitude: -51.3678 },
    { name: 'Arapongas', latitude: -23.4203, longitude: -51.4244 },
    { name: 'Apucarana', latitude: -23.5511, longitude: -51.4608 },
    { name: 'Maringá', latitude: -23.4205, longitude: -51.9333 },
    { name: 'Sarandi', latitude: -23.4436, longitude: -51.8756 },
  ],
  // BR-272: Guaíra - Terra Roxa
  [
    { name: 'Guaíra', latitude: -24.0814, longitude: -54.2564 },
    { name: 'Altônia', latitude: -23.8750, longitude: -53.9022 },
    { name: 'Iporã', latitude: -24.0047, longitude: -53.7050 },
    { name: 'Terra Roxa', latitude: -24.1581, longitude: -53.8211 },
  ],
  // BR-158 Sul: Laranjeiras - Dois Vizinhos
  [
    { name: 'Laranjeiras do Sul', latitude: -25.4075, longitude: -52.4156 },
    { name: 'Quedas do Iguaçu', latitude: -25.4483, longitude: -52.9119 },
    { name: 'Dois Vizinhos', latitude: -25.7333, longitude: -53.0572 },
    { name: 'Francisco Beltrão', latitude: -26.0819, longitude: -53.0547 },
  ],
  // BR-163: Palmital - Cascavel
  [
    { name: 'Palmital', latitude: -24.8844, longitude: -52.7992 },
    { name: 'Corbélia', latitude: -24.7983, longitude: -53.3064 },
    { name: 'Cascavel', latitude: -24.9578, longitude: -53.4590 },
  ],
];

// Helper function to interpolate points between two route points
export function interpolatePoints(
  start: RoutePoint,
  end: RoutePoint,
  segments: number
): RoutePoint[] {
  const points: RoutePoint[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const ratio = i / segments;
    const latitude = start.latitude + (end.latitude - start.latitude) * ratio;
    const longitude = start.longitude + (end.longitude - start.longitude) * ratio;
    
    points.push({
      name: `${start.name}-${end.name} (${i}/${segments})`,
      latitude,
      longitude,
    });
  }
  
  return points;
}

// Get all route points with interpolation for smoother movement
export function getAllRoutePoints(route: RoutePoint[], segmentsPerLeg: number = 5): RoutePoint[] {
  const allPoints: RoutePoint[] = [];
  
  for (let i = 0; i < route.length - 1; i++) {
    const interpolated = interpolatePoints(route[i], route[i + 1], segmentsPerLeg);
    // Add all points except the last one to avoid duplicates
    allPoints.push(...interpolated.slice(0, -1));
  }
  
  // Add the final point
  allPoints.push(route[route.length - 1]);
  
  return allPoints;
}
