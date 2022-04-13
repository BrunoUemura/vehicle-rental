export type PostRequestCustomerSignIn = {
  body: {
    email: string;
    password: string;
  };
};

export type PostRequestCustomerCreate = {
  body: {
    name: string;
    email: string;
    password: string;
    documentNumber: string;
    phoneNumber: string;
    address: {
      street: string;
      number: string;
      district: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
};

export type GetRequestFindOrder = {
  token: string;
  params: {
    customerId?: string;
    orderId?: string;
  };
};

export type PostRequestOrder = {
  token: string;
  params: {};
  body: {
    customerId: string;
    vehicleId: string;
    startDate: string;
    endDate: string;
  };
};
