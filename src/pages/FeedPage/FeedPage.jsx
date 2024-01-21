import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/orders/orders";
import Tablo from "../../components/tablo/tablo";
import { socketDisconnect } from "../../services/actions/socket";
import styles from "./FeedPage.module.css";
import { feedEndpoint } from "../../services/endpoints";
import { getOrdersRequest } from "../../services/actions/orders";

const FeedPage = () => {
  const { isFetching, isError } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const endpoint = feedEndpoint();
  
  useEffect(() => {
    dispatch(getOrdersRequest(endpoint));
    return () => dispatch(socketDisconnect());
  }, [dispatch, endpoint]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Лента заказов</h1>
      {isError && <p className={styles.content}>Ошибка загрузки заказов.</p>}
      {isFetching && <p className={styles.content}>Загружаем сведения о текущих заказах...</p>}
      {!isError && !isFetching && (
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
