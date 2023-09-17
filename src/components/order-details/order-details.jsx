import React from "react";
import { useSelector } from 'react-redux';
import styles from "./order-details.module.css";
import imageDone from "../../images/done.png";

export default function OrderDetails() {
  const order = useSelector(state => state.order);
  return (
    <div className={styles.card}>
      <p
        className={`${styles.order_number} text text_type_digits-large mr-15 ml-15 mt-20 mb-4`}
      >
        {order.number}
      </p>
      <p className="text text_type_main-medium mt-4">
        {!order.number
          ? "ожидайте подтверждение заказа"
          : "идентификатор заказа"}
      </p>
      <img className="mt-15 mb-15" src={imageDone} alt="order accepted" />
      <p className={`text text_type_main-default ${styles.text}`}>
        {!order.number
          ? "Проверяем наличие ингридиентов"
          : `Ваш заказ "${order.description}" начали готовить`}
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
