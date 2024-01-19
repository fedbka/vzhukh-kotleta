import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Orders from "../../components/orders/orders";
import Tablo from "../../components/tablo/tablo";
import { feedConnect, feedDisconnect } from "../../services/actions/feed";
import styles from "./FeedPage.module.css";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedConnect());
    return () => dispatch(feedDisconnect());
  }, [dispatch]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Лента заказов</h1>
      <section className={styles.content}>
        <Orders />
        <Tablo />
      </section>
    </main>
  );
};

export default FeedPage;
