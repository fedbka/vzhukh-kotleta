import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { selectIngredients } from "../../services/store/ingredients.ts";
import { getOrders, selectOrders, selectOrdersIsLoading, selectOrdersIsSuccess } from "../../services/store/orders.ts";
import { feedEndpoint, orderHistoryEndpoint } from "../../services/utils/endpoints.ts";
import { getOrderNormalizedData, getOrderTimeZoneText } from "../../services/utils/orders-proccessing.ts";
import styles from "./order-page.module.css";

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { orderNumber } = useParams();

  const orders = useAppSelector((state) => selectOrders(state));
  const ingredients = useAppSelector(state => selectIngredients(state));

  const { isSuccess: ingredinentIsSuccess, isError: ingredientsIsError } = useGetIngredientsQuery();
  const ordersIsSuccessLoaded = useAppSelector(state => selectOrdersIsSuccess(state));
  const ordersIsLoading = useAppSelector(state => selectOrdersIsLoading(state));


  const isNecessaryLoaded = ordersIsSuccessLoaded && ingredinentIsSuccess;
  const isError = ingredientsIsError;
  const endpoint = location.pathname.includes("feed") ? feedEndpoint() : orderHistoryEndpoint();

  const order = location.state?.order || orders?.find((element) => element.number === parseInt(orderNumber as string));
  const orderStatus = order?.status === "created" ? "Создан" : order?.status === "pending" ? "Готовится" : "Выполнен";
  const orderTime = new Date(order?.updatedAt);
  const timeZone = getOrderTimeZoneText(order?.updatedAt);

  useEffect(() => {
    if (!ordersIsSuccessLoaded && !ordersIsLoading) dispatch(getOrders(endpoint));
  }, [dispatch, ordersIsSuccessLoaded, ordersIsLoading, endpoint]);

  const { orderPrice, orderIngredientsCount } = useMemo(
    () =>
      order && ingredinentIsSuccess
        ? getOrderNormalizedData(order, ingredients)
        : { orderPrice: 0, orderIngredientsCount: [] },
    [order, ingredinentIsSuccess, ingredients]
  );

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
          <h2 className={`${styles.orderNumber} ${!background && styles.orderNumberNonModal}`}>
            #{orderNumber?.toString().padStart(6, "0")}
          </h2>
          <div className={styles.orderTitleAndStatus}>
            <h1 className={styles.orderTitle}>{order.name}</h1>
            <p className={`${styles.orderStatus} ${order.status === "done" && styles.orderStatusDone}`}>
              {orderStatus}
            </p>
            <h2 className={styles.orderIngridientsTitle}>Состав:</h2>
            <ul className={styles.orderIngridients}>
              {orderIngredientsCount.map(([ingredient, count]) => (
                <li className={styles.orderIngridient} key={ingredient._id}>
                  <img className={styles.orderIngridientImage} src={ingredient.image} alt={ingredient.name} />
                  <span className={styles.orderIngridientName}>{ingredient.name}</span>
                  <span className={styles.orderPrice}>
                    <span>{ingredient.type === "bun" && count === 1 ? 2 : count}</span>
                    <span>x</span>
                    <span>{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.orderTimeAndPrice}>
              <span className={styles.orderTime}>
                <FormattedDate date={orderTime} />
                {timeZone}
              </span>
              <span className={styles.orderPrice}>
                {orderPrice}
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

