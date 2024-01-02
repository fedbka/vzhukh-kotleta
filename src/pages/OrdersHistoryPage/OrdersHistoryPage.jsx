import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import styles from "./OrdersHistoryPage.module.css";

const OrdersPage = () => {
  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation="В этом разделе вы можете просмотреть свою историю заказов" />
    </main>
  );
};

export default OrdersPage;
