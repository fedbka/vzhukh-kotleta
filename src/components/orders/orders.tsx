import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { getFeedOrders, selectFeedOrders, selectFeedOrdersIsSuccess } from "../../services/store/orders.ts";
import { orderHistoryEndpoint } from "../../services/utils/endpoints.ts";
import { Order } from "../order/order.tsx";
import styles from "./orders.module.css";

export const Orders = ({ showStatus = false, reverse = false }: { showStatus?: boolean; reverse?: boolean; }) => {
  const feedOrders = useAppSelector(state => selectFeedOrders(state));
  const dispatch = useAppDispatch();
  const location = useLocation();
  const feedOrdersIsSuccess = useAppSelector(state => selectFeedOrdersIsSuccess(state));
  const { isSuccess: ingredientsIsSuccess } = useGetIngredientsQuery();

  useEffect(() => {
    if (!feedOrdersIsSuccess) {
      const endpoint = orderHistoryEndpoint();
      dispatch(getFeedOrders(endpoint));
    }
  }, [dispatch, feedOrdersIsSuccess]);

  return (
    <div className={styles.component}>
      {(!ingredientsIsSuccess || !feedOrdersIsSuccess) && <p className={styles.title}>Загружаем данные...</p>}
      {ingredientsIsSuccess && feedOrdersIsSuccess && (
        <ul className={styles.ordersList}>
          {feedOrders?.map((order, index) => (
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
