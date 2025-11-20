// MDFe Modal types according to Brazilian legislation
export const MDFeModalType = {
  RODOVIARIO: 1, // Highway
  AEREO: 2,      // Air
  AQUAVIARIO: 3, // Water
  FERROVIARIO: 4 // Rail
} as const;

export type MDFeModalType = typeof MDFeModalType[keyof typeof MDFeModalType];

// NCM (Nomenclatura Comum do Mercosul) - Product classification code
export interface NCM {
  code: string;        // 8-digit NCM code
  description: string; // Product description
}

// Invoice item with NCM information
export interface InvoiceItem {
  id: string;
  ncm: NCM;
  quantity: number;
  value: number; // in BRL
}

// Invoice (NF-e) associated with MDFe
export interface Invoice {
  id: string;
  items: InvoiceItem[];
}

// MDFe document with cargo information
export interface MDFe {
  id: string;
  modalType: MDFeModalType;
  cargoDescription: string;
  cargoWeight: number; // in kg
  origin: string;
  destination: string;
  value: number; // in BRL
  invoices: Invoice[]; // NF-es associated with this MDFe
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
