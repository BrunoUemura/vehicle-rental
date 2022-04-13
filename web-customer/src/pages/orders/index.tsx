import Link from "next/link";
import { parseCookies } from "nookies";
import styles from "./styles.module.css";
import OrdersRequest from "../../service/OrdersRequest";
import { OrderType } from "../../types/OrderType";
import OrderList from "../../components/OrderList";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async ({
  req,
  res,
  params,
}: GetServerSidePropsContext) => {
  const { customer_token: token } = parseCookies();
  console.log(token);

  const customerId = "c7c94817-27f1-416a-863d-0258235a1c4e";
  const request = { token, params: { customerId } };
  const data = await OrdersRequest.getAllCustomerOrders(request);

  if (data.status === 401) {
    res.statusCode = 302;
    res.setHeader("Location", `/signin`);
    return { props: {} };
  }

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
