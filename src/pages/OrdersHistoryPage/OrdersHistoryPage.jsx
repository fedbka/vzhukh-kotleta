import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/orders/orders";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { getOrdersRequest } from "../../services/actions/orders";
import { socketDisconnect } from "../../services/actions/socket";
import { orderHistoryEndpoint } from "../../services/endpoints";
import styles from "./OrdersHistoryPage.module.css";

const OrdersPage = () => {
  const { isFetching, isError } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const endpoint = orderHistoryEndpoint();

  useEffect(() => {
    dispatch(getOrdersRequest(endpoint));
    return () => dispatch(socketDisconnect());
  }, [dispatch, endpoint]);

  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation="В этом разделе вы можете просмотреть свою историю заказов" />
      <div className={styles.orders}>
        {isError && <p>Ошибка загрузки заказов.</p>}
        {isFetching && <p>Загружаем сведения о заказах...</p>}
        {!isError && !isFetching && <Orders showStatus={true} reverse={true} />}
      </div>
    </main>
  );
};

export default OrdersPage;
