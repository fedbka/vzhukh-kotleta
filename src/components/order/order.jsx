import styles from "./order.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
const Order = ({ order }) => {
  const orderTime = new Date(order.updatedAt);
  const timeZone = orderTime.getTimezoneOffset() / 60;
  const orderPrice = 0;

  return (
    <div className={styles.component}>
      <div className={styles.orderInfo}>
        <span>#{order.number}</span>
        <span className={styles.orderTime}>
          <FormattedDate date={orderTime} />
          {" i-GMT" + timeZone}
        </span>
      </div>
      <h1 className={styles.orderTitle}>{order.name}</h1>
      <div className={styles.orderInfo}>
        <span></span>
        <div className={styles.orderPrice}>
          <span>{orderPrice}</span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default Order;
