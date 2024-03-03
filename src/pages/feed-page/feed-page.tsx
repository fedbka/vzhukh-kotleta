import { Orders } from "../../components/orders/orders.tsx";
import Tablo from "../../components/tablo/tablo.jsx";
import styles from "./feed-page.module.css";

export const FeedPage = () => {
  const isError = false;
  const isLoading = true;
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Лента заказов</h1>
      {isError && <p className={styles.content}>Ошибка загрузки заказов.</p>}
      {!isLoading && <p className={styles.content}>Загружаем сведения о текущих заказах...</p>}
      {!isError && isLoading && (
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
