import styles from "./order.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
const Order = ({ order, showStatus = false }) => {
  const orderTime = new Date(order.updatedAt);
  const timeZone = orderTime.getTimezoneOffset() / 60;
  const orderPrice = 0;
  const orderStatus = order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : "Выполнен";
  return (
    <div className={styles.component}>
      <div className={styles.orderInfo}>
        <span>#{order.number.toString().padStart(6, '0')}</span>
        <span className={styles.orderTime}>
          <FormattedDate date={orderTime} />
          {" i-GMT" + timeZone}
        </span>
      </div>
      <div className={styles.orderTitleAndStatus}>
        <h1 className={styles.orderTitle}>{order.name}</h1>
        {showStatus && (<p className={`${styles.orderStatus} ${order.status === 'done' && styles.orderStatusDone}`}>{orderStatus}</p>)}
      </div>
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
