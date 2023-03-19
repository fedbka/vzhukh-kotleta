import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ ingridients }) {
  const bunIngridient = ingridients.find(
    (ingridient) => ingridient.type === "bun"
  );

  const otherIngridients = ingridients.filter(
    (ingridient) => ingridient.type !== "bun"
  );

  const [orderSumm, setOrderSumm] = React.useState(
    otherIngridients.reduce((prev, ingridient) => {
      return prev + ingridient.price;
    }, 0) + bunIngridient.price
  );

  return (
    <section className={styles.component}>
      {bunIngridient && (
        <ConstructorElement
          type="top"
          text={bunIngridient.name}
          price={bunIngridient.price}
          isLocked={true}
          thumbnail={bunIngridient.image}
          extraClass="mt-4 mb-4"
        />
      )}
      <ul className={styles.filling_ingridients}>
        {otherIngridients.map((ingridient, index) => (
          <>
            <DragIcon />
            <ConstructorElement
              text={ingridient.name}
              price={ingridient.price}
              thumbnail={ingridient.image}
            />
          </>
        ))}
      </ul>
      {bunIngridient && (
        <ConstructorElement
          type="bottom"
          text={bunIngridient.name}
          price={bunIngridient.price}
          isLocked={true}
          thumbnail={bunIngridient.image}
          extraClass="mt-4 mb-4"
        />
      )}
      <div className={styles.accept_order}>
        <div className={styles.totals}>
          <span className="text text_type_digits-medium">{orderSumm}</span>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
