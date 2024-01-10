import Order from "../order/order";
import styles from "./order-history.module.css";

const OrderHistory = () => {
  return (
    <div className={styles.component}>
      <Order />
    </div>
  );
};

export default OrderHistory;
