import { useSelector } from "react-redux";
import imageDone from "../../images/done.png";
import styles from "./order-submit.module.css";

const OrderSubmit = () => {
  const { number, description, requestFailed } = useSelector((state) => state.order);

  return (
    <div className={styles.card}>
      {requestFailed && (
        <>
          <p className={styles.text}>Ошибка при отправке данных заказа.</p>
          <p className={styles.text}>Пожалуйста, повторите позднее.</p>
        </>
      )}
      {!requestFailed && (
        <>
          <p className={styles.order_number}>{number}</p>
          <p className={styles.textConfirmation}>
            {!number ? "ожидайте подтверждение заказа" : "идентификатор заказа"}
          </p>
          <img className={styles.imageDone} src={imageDone} alt="order accepted" />
          <p className={styles.text}>
            {!number ? "Проверяем наличие ингридиентов" : `Ваш заказ "${description}" начали готовить`}
          </p>
          <p className={styles.textInactive}>Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
};

export default OrderSubmit;
