import { useAppSelector } from "../../hooks/store.ts";
import { selectOrders, selectOrdersQuantityForAllTime, selectOrdersQuantityForToday } from "../../services/store/orders.ts";
import styles from "./tablo.module.css";

export const Tablo = () => {

  const orders = useAppSelector(state => selectOrders(state));
  const ordersQuantityForAllTime = useAppSelector(state => selectOrdersQuantityForAllTime(state));
  const ordersQuantityForToday = useAppSelector(state => selectOrdersQuantityForToday(state));

  const numbersOfOrdersDoned = orders.filter((order) => order.status === "done").slice(0, 20).map(element => element.number);
  const numbersOfOrdersInWork = orders.filter((order) => order.status === "pending").slice(0, 20).map(element => element.number);

  return (
    <div className={styles.component}>
      <div className={styles.columns}>
        <div className={styles.statsBlockFixed}>
          <p className={styles.statsTitle}>Готовы:</p>
          <ul className={styles.ordersNumbers}>
            {numbersOfOrdersDoned.map(number => {
              return <li key={number} className={styles.orderNumberDone}>{number.toString().padStart(6, '0')}</li>;
            })}
          </ul>
        </div>
        <div className={styles.statsBlockFixed}>
          <p className={styles.statsTitle}>В работе:</p>
          <ul className={styles.ordersNumbers}>
            {numbersOfOrdersInWork.map(number => {
              return <li key={number} className={styles.orderNumber}>{number.toString().padStart(6, '0')}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className={styles.statsBlock}>
        <p className={styles.statsTitle}>Выполнено за всё время:</p>
        <p className={styles.digits}>{ordersQuantityForAllTime}</p>
      </div>
      <div className={styles.statsBlock}>
        <p className={styles.statsTitle}>Выполнено за сегодня:</p>
        <p className={styles.digits}>{ordersQuantityForToday}</p>
      </div>
    </div>
  );
};
