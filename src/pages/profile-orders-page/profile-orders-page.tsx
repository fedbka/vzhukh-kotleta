import { Orders } from "../../components/orders/orders.tsx";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation.tsx";
import styles from "./profile-orders-page.module.css";

export const ProfileOrdersPage = () => {

  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation="В этом разделе вы можете просмотреть свою историю заказов" />
      <div className={styles.orders}>
        <Orders showStatus={true} reverse={true} />
      </div>
    </main>
  );
};
