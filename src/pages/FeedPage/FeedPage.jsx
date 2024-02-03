import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/orders/orders";
import Tablo from "../../components/tablo/tablo";
import { getIngridients } from "../../services/actions/ingridients";
import { getOrdersRequest } from "../../services/actions/orders";
import { socketDisconnect } from "../../services/actions/socket";
import { feedEndpoint } from "../../services/endpoints";
import styles from "./FeedPage.module.css";

const FeedPage = () => {
  const {
    itemsLoaded: ordersLoaded,
    isError: ordersIsError,
  } = useSelector((store) => store.orders);
  const {
    itemsLoaded: ingredientsLoaded,
    isFetching: ingredientsIsFetching,
    isError: ingredientsIsError,
  } = useSelector((store) => store.ingridients);
  const dispatch = useDispatch();
  const [endpoint] = useState(feedEndpoint());

  const isNecessaryLoaded = ordersLoaded && ingredientsLoaded;
  const isError = ordersIsError || ingredientsIsError;

  useEffect(() => {
    if (!ingredientsLoaded && !ingredientsIsFetching) dispatch(getIngridients());
    dispatch(getOrdersRequest(endpoint));
    return () => dispatch(socketDisconnect());
  }, [dispatch, endpoint]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Лента заказов</h1>
      {isError && <p className={styles.content}>Ошибка загрузки заказов.</p>}
      {!isNecessaryLoaded && <p className={styles.content}>Загружаем сведения о текущих заказах...</p>}
      {!isError && isNecessaryLoaded && (
        <>
          <section className={styles.content}>
            <Orders />
            <Tablo />
          </section>
        </>
      )}
    </main>
  );
};

export default FeedPage;
