export interface CreateCustomer {
  customerId: string;
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  active: boolean;
}

export interface UpdateCustomer {
  customerId: string;
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  active: boolean;
}
