import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { selectIngredients } from "../../services/store/ingredients.ts";
import { getOrderNormalizedData, getOrderStatusText, getOrderTimeZoneText } from "../../services/utils/orders-proccessing.ts";
import { TOrder } from "../../types/types.ts";
import styles from "./order.module.css";

export const Order = ({ order, showStatus = false }: { order: TOrder, showStatus?: boolean }) => {
  const ingredients = useAppSelector((state) => selectIngredients(state));
  const {isSuccess: ingredientsLoaded } = useGetIngredientsQuery();
  const orderTime = new Date(order.updatedAt);
  const timeZone = getOrderTimeZoneText(order.updatedAt)
  const orderStatus = getOrderStatusText(order.status);

  const { orderPrice, orderIngredientsCount } = useMemo(
    () =>
      order && ingredientsLoaded
        ? getOrderNormalizedData(order, ingredients)
        : { orderPrice: 0, orderIngredientsCount: [] },
    [order, ingredientsLoaded, ingredients]
  );

  return (
    <div className={styles.component}>
      <div className={styles.orderInfo}>
        <span>#{order.number.toString().padStart(6, "0")}</span>
        <span className={styles.orderTime}>
          <FormattedDate date={orderTime} />
          {timeZone}
        </span>
      </div>
      <div className={styles.orderTitleAndStatus}>
        <h1 className={styles.orderTitle}>{order.name}</h1>
        {showStatus && (
          <p className={`${styles.orderStatus} ${order.status === "done" && styles.orderStatusDone}`}>{orderStatus}</p>
        )}
      </div>
      <div className={styles.orderInfo}>
        <ul className={styles.orderIngridientsImages}>
          {orderIngredientsCount.length > 5 && (
            <li key={orderIngredientsCount[5]._id + order.number}>
              <div className={styles.orderIngridientImageThumbnail}>
                <img
                  className={`${styles.orderIngridientImage} ${orderIngredientsCount.length > 6 && styles.orderIngridientImageLast
                    }`}
                  src={orderIngredientsCount[5][0].image}
                  alt={orderIngredientsCount[5][0].name}
                  title={orderIngredientsCount[5][0].name}
                ></img>
                {orderIngredientsCount.length > 6 && (
                  <div className={styles.orderIngridientImageCaption}>+{orderIngredientsCount.length - 6}</div>
                )}
              </div>
            </li>
          )}
          {orderIngredientsCount
            .slice(0, 5)
            .reverse()
            .map(([ingredient, count], index) => (
              <li key={ingredient._id + order.number}>
                <img
                  className={styles.orderIngridientImage}
                  src={ingredient.image}
                  alt={ingredient.name}
                  title={ingredient.name}
                ></img>
              </li>
            ))}
        </ul>
        <div className={styles.orderPrice}>
          <span>{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
