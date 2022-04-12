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
