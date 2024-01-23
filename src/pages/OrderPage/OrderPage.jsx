import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getIngridients } from "../../services/actions/ingridients";
import { getOrdersRequest } from "../../services/actions/orders";
import { feedEndpoint, orderHistoryEndpoint } from "../../services/endpoints";
import styles from "./OrderPage.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { orderNumber } = useParams();
  const orders = useSelector((store) => store.orders);
  const ingredients = useSelector((store) => store.ingridients);
  const isNecessaryLoaded = orders.itemsLoaded && ingredients.itemsLoaded;
  const isError = orders.isError || ingredients.isError;
  const endpoint = location.pathname.includes("feed") ? feedEndpoint() : orderHistoryEndpoint();

  const order = location.state?.order || orders?.items.find((element) => element.number === parseInt(orderNumber));
  const orderStatus = order?.status === "created" ? "Создан" : order?.status === "pending" ? "Готовится" : "Выполнен";
  const orderTime = new Date(order?.updatedAt);
  const timeZone = orderTime?.getTimezoneOffset() / 60;
  const orderPrice = 0;

  useEffect(() => {
    if (!ingredients.itemsLoaded && !ingredients.isFetching) dispatch(getIngridients());
    if (!orders.itemsLoaded && !orders.isFetching) dispatch(getOrdersRequest(endpoint));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      {!isNecessaryLoaded && !isError && (
        <h1 className={styles.orderInfo}>Загружаем данные заказа #{orderNumber}...</h1>
      )}
      {!isNecessaryLoaded && isError && (
        <h1 className={styles.orderInfo}>Ошибка загрузки данных заказа #{orderNumber}</h1>
      )}
      {isNecessaryLoaded && (
        <>
          <h2 className={`${styles.orderNumber} ${!background && styles.orderNumberNonModal}`}>#{orderNumber.toString().padStart(6, "0")}</h2>
          <div className={styles.orderTitleAndStatus}>
            <h1 className={styles.orderTitle}>{order.name}</h1>
            <p className={`${styles.orderStatus} ${order.status === "done" && styles.orderStatusDone}`}>
              {orderStatus}
            </p>
            <h2 className={styles.orderIngridientsTitle}>Состав:</h2>
            <ul className={styles.orderIngridients}>
              {order.ingredients.map((element) => (
                <li key={element}>{element}</li>
              ))}
            </ul>
            <div className={styles.orderTimeAndPrice}>
              <span className={styles.orderTime}>
                <FormattedDate date={orderTime} />
                {" i-GMT" + timeZone}
              </span>
              <span className={styles.orderPrice}>
                {orderPrice}
                <CurrencyIcon/>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
