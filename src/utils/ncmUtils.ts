import type { Vehicle, NCM } from '../types/vehicle';

/**
 * Extract all unique NCMs from a list of vehicles
 */
export const extractUniqueNCMs = (vehicles: Vehicle[]): NCM[] => {
  const ncmMap = new Map<string, NCM>();

  vehicles.forEach(vehicle => {
    if (vehicle.mdfe?.invoices) {
      vehicle.mdfe.invoices.forEach(invoice => {
        invoice.items.forEach(item => {
          if (!ncmMap.has(item.ncm.code)) {
            ncmMap.set(item.ncm.code, item.ncm);
          }
        });
      });
    }
  });

  return Array.from(ncmMap.values()).sort((a, b) => 
    a.code.localeCompare(b.code)
  );
};

/**
 * Check if a vehicle has any of the specified NCMs
 */
export const vehicleHasNCM = (vehicle: Vehicle, ncmCodes: string[]): boolean => {
  if (ncmCodes.length === 0) {
    return true; // No filter applied, show all vehicles
  }

  if (!vehicle.mdfe?.invoices) {
    return false; // Vehicle has no invoices, exclude it
  }

  // Check if any invoice item has one of the filtered NCMs
  return vehicle.mdfe.invoices.some(invoice =>
    invoice.items.some(item =>
      ncmCodes.includes(item.ncm.code)
    )
  );
};

/**
 * Filter vehicles by NCM codes
 */
export const filterVehiclesByNCM = (vehicles: Vehicle[], ncmCodes: string[]): Vehicle[] => {
  if (ncmCodes.length === 0) {
    return vehicles; // No filter, return all
  }

  return vehicles.filter(vehicle => vehicleHasNCM(vehicle, ncmCodes));
};
