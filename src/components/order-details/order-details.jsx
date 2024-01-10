import { useSelector } from "react-redux";
import imageDone from "../../images/done.png";
import styles from "./order-details.module.css";

const OrderDetails = () => {
  const { number, description, requestFailed } = useSelector((state) => state.order);

  return (
    <div className={styles.card}>
      {requestFailed && (
        <>
          <p className={`text text_type_main-default ${styles.text}`}>Ошибка при отправке данных заказа.</p>
          <p className={`text text_type_main-default ${styles.text}`}>Пожалуйста, повторите позднее.</p>
        </>
      )}
      {!requestFailed && (
        <>
          <p className={`${styles.order_number} text text_type_digits-large mr-15 ml-15 mt-20 mb-4`}>{number}</p>
          <p className="text text_type_main-medium mt-4">
            {!number ? "ожидайте подтверждение заказа" : "идентификатор заказа"}
          </p>
          <img className="mt-15 mb-15" src={imageDone} alt="order accepted" />
          <p className={`text text_type_main-default ${styles.text}`}>
            {!number ? "Проверяем наличие ингридиентов" : `Ваш заказ "${description}" начали готовить`}
          </p>
          <p className="text text_type_main-default text_color_inactive mb-20">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
