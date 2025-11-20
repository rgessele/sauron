// Types for fixed points on the map (PRF posts and Receita offices)

export const FixedPointType = {
  PRF: 'PRF',           // Polícia Rodoviária Federal
  RECEITA: 'RECEITA'    // Receita Estadual do Paraná
} as const;

export type FixedPointType = typeof FixedPointType[keyof typeof FixedPointType];

export interface FixedPoint {
  id: string;
  type: FixedPointType;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  email?: string;
}
