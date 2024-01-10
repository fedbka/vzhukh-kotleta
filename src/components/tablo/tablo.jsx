import styles from "./tablo.module.css";

const Tablo = () => {
  return (
    <div className={styles.component}>
      <div className={styles.currentOrders}> </div>
      <div className={styles.ordersCountAllTime}></div>
      <div className={styles.ordersCountToday}></div>
    </div>
  );
};

export default Tablo;
