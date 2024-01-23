import { useSelector } from "react-redux";
import styles from "./tablo.module.css";

const Tablo = () => {
  const { items, numberOfOrdersForAllTime, numberOfOrdersForToday } = useSelector((store) => store.orders);

  const numbersOfOrdersDoned = items.filter((order) => order.status === "done").slice(0, 20).map(element => element.number);
  const numbersOfOrdersInWork = items.filter((order) => order.status === "pending").slice(0, 20).map(element => element.number);

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
        <p className={styles.digits}>{numberOfOrdersForAllTime}</p>
      </div>
      <div className={styles.statsBlock}>
        <p className={styles.statsTitle}>Выполнено за сегодня:</p>
        <p className={styles.digits}>{numberOfOrdersForToday}</p>
      </div>
    </div>
  );
};

export default Tablo;
