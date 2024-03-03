import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { selectOrders, selectOrdersIsSuccess } from "../../services/store/orders.ts";
import { Order } from "../order/order.tsx";
import styles from "./orders.module.css";

export const Orders = ({ showStatus = false, reverse = false }: { showStatus?: boolean; reverse?: boolean; }) => {
  const [...orders] = useAppSelector(state => selectOrders(state));
  const location = useLocation();
  const ordersIsSuccessLoaded = useAppSelector(state => selectOrdersIsSuccess(state));
  const { isSuccess: ingredientsIsSuccess } = useGetIngredientsQuery();

  reverse && ordersIsSuccessLoaded && orders?.reverse();

  return (
    <div className={styles.component}>
      {(!ingredientsIsSuccess || !ordersIsSuccessLoaded) && <p className={styles.title}>Загружаем данные...</p>}
      {ingredientsIsSuccess && ordersIsSuccessLoaded && (
        <ul className={styles.ordersList}>
          {orders?.map((order, index) => (
            <li className={styles.order} key={index}>
              <Link to={`${order.number}`} state={{ background: location, state: order }} className={styles.link}>
                <Order order={order} showStatus={showStatus} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
