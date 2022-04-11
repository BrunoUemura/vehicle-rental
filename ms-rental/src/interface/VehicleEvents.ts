export interface VehicleInterface {
  event?: string;
  vehicleId: string;
  name: string;
  model: string;
  brand: string;
  year: number;
  type: string;
  kilometers: number;
  plate?: string;
  available?: boolean;
}
