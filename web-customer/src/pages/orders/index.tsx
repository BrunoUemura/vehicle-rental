import AuthRequest from "../../service/AuthRequest";
import { OrderType } from "../../types/OrderType";

export const getServerSideProps = async () => {
  const customerId = "c7c94817-27f1-416a-863d-0258235a1c4e";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3Yzk0ODE3LTI3ZjEtNDE2YS04NjNkLTAyNTgyMzVhMWM0ZSIsImlhdCI6MTY0OTcyMTMwOCwiZXhwIjoxNjQ5NzI0OTA4fQ.5mjtkDVMwKGbo9HiQ3kchtC8jb2drs-eaneRlsK47Tg";
  const request = { token, params: { customerId } };
  const data = await AuthRequest.getAllCustomerOrders(request);

  return {
    props: { ...data },
  };
};

export default function Orders({ body }: OrderType) {
  return (
    <div>
      {body?.map((order) => (
        <div key={order.orderId}>
          <span>Start Date: {order.startDate}</span>
          <span>End Date: {order.startDate}</span>
          <span></span>
        </div>
      ))}
    </div>
  );
}
