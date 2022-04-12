import moment from "moment";
import styles from "./styles.module.css";
import { Order } from "../../types/OrderType";
import Link from "next/link";
import Router from "next/router";

type Props = {
  orders: Order[];
};

export default function OrderList({ orders }: Props) {
  const formatDate = (date: string | null) => {
    if (!date) return "";
    return moment(date).format("YYYY-MM-DD");
  };

  const formatUnit = (prefix: string, value: number | null) => {
    if (!value) return `0 ${prefix.toLowerCase()}`;
    return `${value} ${prefix.toLowerCase()}`;
  };

  const formatAmount = (prefix: string, amount: number) => {
    return `${prefix} ${amount.toFixed(2)}`;
  };

  return (
    <div className={styles.container}>
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Orderer</th>
            <th scope="col">Vehicle</th>
            <th scope="col">Vehicle Type</th>
            <th scope="col">Vehicle Plate</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Returned</th>
            <th scope="col">Estimated (KM)</th>
            <th scope="col">Driven (KM)</th>
            <th scope="col">Estimated Amount (R$)</th>
            <th scope="col">Additional Amount (R$)</th>
            <th scope="col">Total Amount (R$)</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{order.customer.name}</td>
              <td>{order.vehicle.name}</td>
              <td>{order.vehicle.type}</td>
              <td>{order.vehicle.plate}</td>
              <td>{formatDate(order.startDate)}</td>
              <td>{formatDate(order.endDate)}</td>
              <td>{formatDate(order.returnedDate)}</td>
              <td>{formatUnit("KM", order.estimatedKM)}</td>
              <td>{formatUnit("KM", order.drivenKM)}</td>
              <td>{formatAmount("R$", order.estimatedAmount)}</td>
              <td>{formatAmount("R$", order.additionalAmount)}</td>
              <td>{formatAmount("R$", order.totalAmount)}</td>
              <td className={styles.actions}>
                <Link href={`/orders/edit/${order.orderId}`} passHref>
                  <span className={styles.editAction}>Edit</span>
                </Link>
                <Link href={`/orders/return/${order.orderId}`} passHref>
                  <span className={styles.returnAction}>Return</span>
                </Link>
                <Link href={`/orders/cancel/${order.orderId}`} passHref>
                  <span className={styles.cancelAction}>Cancel</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
