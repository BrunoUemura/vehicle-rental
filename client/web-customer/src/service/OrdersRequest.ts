import { GetRequestFindOrder, PostRequestOrder } from "../types/RequestType";

export default class OrdersRequest {
  static async getAllCustomerOrders(request: GetRequestFindOrder) {
    try {
      console.log(process.env.BACKEND_API);

      const res = await fetch(
        `${process.env.BACKEND_API}/api/v1/order?customerId=${request.params.customerId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${request.token}`,
          },
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  static async getOrder(request: GetRequestFindOrder) {
    try {
      const res = await fetch(
        `${process.env.BACKEND_API}/api/v1/order?orderId=${request.params.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${request.token}`,
          },
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  static async createOrder(request: PostRequestOrder) {
    try {
      const res = await fetch(`${process.env.BACKEND_API}/api/v1/order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${request.token}`,
        },
        body: JSON.stringify(request.body),
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  //   static async updateList(request: PutRequestList) {
  //     try {
  //       const data = await axios.put(
  //         `${process.env.BACKEND_API}/api/v1/user/${request.params.userId}/list/${request.params.listId}`,
  //         request.body
  //       );
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   static async deleteList(request: DeleteRequestList) {
  //     try {
  //       console.log("Entered here");
  //       console.log(process.env.BACKEND_API);

  //       const res = await fetch(
  //         `${process.env.BACKEND_API}/api/v1/user/${request.params.userId}/list/${request.params.listId}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );

  //       const data = await res.json();

  //       // const data = await axios.delete(
  //       //   `${process.env.BACKEND_API}/api/v1/user/${request.params.userId}/list/${request.params.listId}`
  //       // );

  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
