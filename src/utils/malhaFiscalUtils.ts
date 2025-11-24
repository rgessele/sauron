import type { Vehicle, MalhaFiscal } from '../types/vehicle';

/**
 * Extract all unique malhas fiscais from a list of vehicles
 */
export const extractUniqueMalhasFiscais = (vehicles: Vehicle[]): MalhaFiscal[] => {
  const malhaMap = new Map<string, MalhaFiscal>();

  vehicles.forEach(vehicle => {
    if (vehicle.malhasFiscais) {
      vehicle.malhasFiscais.forEach(malha => {
        if (!malhaMap.has(malha.code)) {
          malhaMap.set(malha.code, malha);
        }
      });
    }
  });

  return Array.from(malhaMap.values()).sort((a, b) => 
    a.code.localeCompare(b.code)
  );
};

/**
 * Check if a vehicle has any of the specified malhas fiscais
 */
export const vehicleHasMalhaFiscal = (vehicle: Vehicle, malhaCodes: string[]): boolean => {
  if (malhaCodes.length === 0) {
    return true; // No filter applied, show all vehicles
  }

  if (!vehicle.malhasFiscais || vehicle.malhasFiscais.length === 0) {
    return false; // Vehicle has no malhas fiscais, exclude it
  }

  // Check if vehicle has one of the filtered malhas fiscais
  return vehicle.malhasFiscais.some(malha =>
    malhaCodes.includes(malha.code)
  );
};

/**
 * Filter vehicles by malha fiscal codes
 */
export const filterVehiclesByMalhaFiscal = (vehicles: Vehicle[], malhaCodes: string[]): Vehicle[] => {
  if (malhaCodes.length === 0) {
    return vehicles; // No filter, return all
  }

  return vehicles.filter(vehicle => vehicleHasMalhaFiscal(vehicle, malhaCodes));
};
