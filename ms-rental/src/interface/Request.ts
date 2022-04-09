export interface FindOrders {
  customerId?: string;
  orderId?: string;
}

export interface CreateOrder {
  customerDocumentNumber?: string;
  customerId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  estimatedKM: number;
  estimatedAmount?: number;
  additionalAmount?: number;
  totalAmount?: number;
}

export interface UpdateOrder {
  orderId: string;
  customerId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  estimatedKM: number;
  estimatedAmount?: number;
  additionalAmount?: number;
  totalAmount?: number;
  drivenKM?: number;
  returnedDate?: Date;
}
