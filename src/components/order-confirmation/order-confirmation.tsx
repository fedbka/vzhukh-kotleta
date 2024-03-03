import { useEffect } from "react";
import { useAppSelector } from "../../hooks/store.ts";
import imageDone from "../../images/done.png";
import { useSendOrderMutation } from "../../services/api/orders.ts";
import { selectCart } from "../../services/store/cart.ts";
import { selectOrderConfirmation } from "../../services/store/orders.ts";
import styles from "./order-confirmation.module.css";

export const OrderConfirmation = () => {
  const cartIngredients = useAppSelector(state => selectCart(state));
  const { number, name } = useAppSelector((state) => selectOrderConfirmation(state));
  const [sendOrder, { isLoading, isError, isSuccess }] = useSendOrderMutation();

  useEffect(() => {
    cartIngredients.length && !isLoading && sendOrder({ ingredients: cartIngredients.map(ingredient => ingredient._id) });
  }, [sendOrder, cartIngredients, isLoading]);

  return (
    <div className={styles.card}>
      {isError && (
        <>
          <p className={styles.text}>Ошибка при отправке данных заказа.</p>
          <p className={styles.text}>Пожалуйста, повторите позднее.</p>
        </>
      )}
      {!isError && (
        <>
          <p className={styles.order_number}>{isSuccess && number}</p>
          <p className={styles.textConfirmation}>
            {!isSuccess ? "ожидайте подтверждение заказа" : "идентификатор заказа"}
          </p>
          <img className={styles.imageDone} src={imageDone} alt="order accepted" />
          <p className={styles.text}>
            {!isSuccess ? "Проверяем наличие ингридиентов" : `Ваш заказ "${name}" начали готовить`}
          </p>
          <p className={styles.textInactive}>Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
};
