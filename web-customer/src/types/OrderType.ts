import { Customer } from "./CustomerType";
import { Vehicle } from "./VehicleType";

export type OrderType = {
  status: number;
  body: Order[];
};

export type Order = {
  orderId: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  estimatedKM: number;
  estimatedAmount: number;
  additionalAmount: number;
  totalAmount: number;
  drivenKM: number | null;
  returnedDate: string | null;
  createdAt: string;
  updatedAt: string;
  canceledAt: Date | null;
  customer: Customer;
  vehicle: Vehicle;
};
