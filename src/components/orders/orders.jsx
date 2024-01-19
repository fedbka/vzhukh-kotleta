import { useSelector } from "react-redux";
import Order from "../order/order";
import styles from "./orders.module.css";

const Orders = () => {
  const { orders, isFetching, isError } = useSelector((store) => store.feed);

  return (
    <div className={styles.component}>
      {isError && <h1 className={styles.title}>Ошибка загрузки заказов</h1>}
      {isFetching && <h1 className={styles.title}>Загружаем текущие заказы...</h1>}
      {!isError && !isFetching && (
        <ul className={styles.ordersList}>
          {orders.map((order, index) => (
            <li className={styles.order} key={index}>
              <Order order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
