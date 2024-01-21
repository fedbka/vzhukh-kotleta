import { useSelector } from "react-redux";
import Order from "../order/order";
import styles from "./orders.module.css";

const Orders = () => {
  const { items } = useSelector((store) => store.orders);

  return (
    <div className={styles.component}>
      <ul className={styles.ordersList}>
        {items && items.map((order, index) => (
          <li className={styles.order} key={index}>
            <Order order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
