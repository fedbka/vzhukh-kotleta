import { useEffect } from "react";
import { Orders } from "../../components/orders/orders.tsx";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { clearOrders, getOrders, selectOrdersIsLoading, selectOrdersIsSuccess } from "../../services/store/orders.ts";
import { orderHistoryEndpoint } from "../../services/utils/endpoints.ts";
import styles from "./profile-orders-page.module.css";

export const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const ordersIsSuccessLoaded = useAppSelector(state => selectOrdersIsSuccess(state));
  const ordersIsLoading = useAppSelector(state => selectOrdersIsLoading(state));

  const { isSuccess: ingredientsIsSuccess } = useGetIngredientsQuery();

  useEffect(() => () => { dispatch(clearOrders()) }, []);
  useEffect(() => {
    if (!ordersIsSuccessLoaded && !ordersIsLoading) {
      const endpoint = orderHistoryEndpoint();
      dispatch(getOrders(endpoint));
    }
  }, [dispatch, ordersIsSuccessLoaded, ordersIsLoading, ingredientsIsSuccess]);

  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation="В этом разделе вы можете просмотреть свою историю заказов" />
      <div className={styles.orders}>
        <Orders showStatus={true} reverse={true} />
      </div>
    </main>
  );
};
