// MDFe Modal types according to Brazilian legislation
export const MDFeModalType = {
  RODOVIARIO: 1, // Highway
  AEREO: 2,      // Air
  AQUAVIARIO: 3, // Water
  FERROVIARIO: 4 // Rail
} as const;

export type MDFeModalType = typeof MDFeModalType[keyof typeof MDFeModalType];

// MDFe document with cargo information
export interface MDFe {
  id: string;
  modalType: MDFeModalType;
  cargoDescription: string;
  cargoWeight: number; // in kg
  origin: string;
  destination: string;
  value: number; // in BRL
}

// Vehicle with optional MDFe
export interface Vehicle {
  id: string;
  plate: string;
  latitude: number;
  longitude: number;
  mdfe?: MDFe;
  lastUpdate: Date;
}
