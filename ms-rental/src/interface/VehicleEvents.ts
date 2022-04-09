export interface CreateVehicle {
  vehicleId: string;
  name: string;
  model: string;
  brand: string;
  year: number;
  type: string;
  kilometers: number;
  plate: string;
}

export interface UpdateVehicle {
  vehicleId: string;
  name: string;
  model: string;
  brand: string;
  year: number;
  type: string;
  kilometers: number;
  plate: string;
  available: boolean;
}
