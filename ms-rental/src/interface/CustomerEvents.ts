export interface CustomerEvent {
  event?: string;
  customerId: string;
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  active: boolean;
}
