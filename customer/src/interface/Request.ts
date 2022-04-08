export interface RequestCreateCustomer {
  customerId?: string;
  name: string;
  email: string;
  password: string;
  documentNumber: string;
  phoneNumber: string;
  address: {
    street: string;
    number: number;
    district: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}
