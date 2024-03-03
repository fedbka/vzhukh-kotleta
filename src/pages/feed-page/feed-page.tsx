import { useEffect } from "react";
import { Orders } from "../../components/orders/orders.tsx";
import { Tablo } from "../../components/tablo/tablo.jsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { selectOrdersIsSuccess, selectOrdersIsLoading, clearOrders, getOrders } from "../../services/store/orders.ts";
import { feedEndpoint } from "../../services/utils/endpoints.ts";
import styles from "./feed-page.module.css";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const ordersIsSuccessLoaded = useAppSelector(state => selectOrdersIsSuccess(state));
  const ordersIsLoading = useAppSelector(state => selectOrdersIsLoading(state));

  const { isSuccess: ingredientsIsSuccess } = useGetIngredientsQuery();

  useEffect(() => () => {dispatch(clearOrders())}, []);
  useEffect(() => {
    if (!ordersIsSuccessLoaded && !ordersIsLoading)  {
      const endpoint = feedEndpoint();
      dispatch(getOrders(endpoint));
    }
  }, [dispatch, ordersIsSuccessLoaded, ordersIsLoading, ingredientsIsSuccess]);
   
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
