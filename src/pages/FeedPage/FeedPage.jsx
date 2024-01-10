import OrderHistory from "../../components/order-history/order-history";
import Tablo from "../../components/tablo/tablo";
import styles from "./FeedPage.module.css";

const FeedPage = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Страница списка заказов</h1>
      <section className={styles.content}>
        <OrderHistory/>
        <Tablo/>
      </section>
    </main>
  );
};

export default FeedPage;
