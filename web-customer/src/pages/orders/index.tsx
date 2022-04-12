import Link from "next/link";
import styles from "./styles.module.css";
import AuthRequest from "../../service/AuthRequest";
import { OrderType } from "../../types/OrderType";
import OrderList from "../../components/OrderList";

export const getServerSideProps = async () => {
  const customerId = "c7c94817-27f1-416a-863d-0258235a1c4e";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3Yzk0ODE3LTI3ZjEtNDE2YS04NjNkLTAyNTgyMzVhMWM0ZSIsImlhdCI6MTY0OTc4MzI3NywiZXhwIjoxNjQ5Nzg2ODc3fQ.n7ZX7nPaHoM4TPU_WEH5mQTArhaz3i0KARnfMVF910o";
  const request = { token, params: { customerId } };
  const data = await AuthRequest.getAllCustomerOrders(request);
  console.log(data.status);

  return {
    props: { ...data },
  };
};

export default function Orders({ body }: OrderType) {
  return (
    <div className={styles.container}>
      <h1>Your Rental Orders</h1>

      <div className={styles.button}>
        <Link href={"/orders/create"} passHref>
          <button type="submit" className="btn btn-primary mb-3">
            + New
          </button>
        </Link>
      </div>

      <div className={styles.orders}>
        <OrderList orders={body} />
      </div>
    </div>
  );
}
