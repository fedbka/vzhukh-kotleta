import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import propTypes from "prop-types";
import Modal from "../modal/modal";

const modalRoot = document.getElementById("modal");
function BurgerConstructor({ ingridients }) {
  const [orderSumm, setOrderSumm] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);

  const acceptOrder = () => {
    setShowModal(true);
  };

  const bunIngridient =
    ingridients && ingridients.find((ingridient) => ingridient.type === "bun");

  const otherIngridients =
    ingridients &&
    ingridients.filter((ingridient) => ingridient.type !== "bun");

  function getOrderSumm() {
    return (
      (otherIngridients
        ? otherIngridients.reduce((prev, ingridient) => {
            return prev + ingridient.price;
          }, 0)
        : 0) + (bunIngridient ? bunIngridient.price : 0)
    );
  }

  React.useEffect(() => setOrderSumm(getOrderSumm()), [ingridients]);

  return (
    <>
      {showModal && (
        <Modal handlerOnClose={() => setShowModal(false)} modalRoot={modalRoot}>
          <OrderDetails />
        </Modal>
      )}
      <section className={styles.component}>
        {bunIngridient && (
          <ConstructorElement
            type="top"
            text={`${bunIngridient.name} (верх)`}
            price={bunIngridient.price}
            isLocked={true}
            thumbnail={bunIngridient.image}
            extraClass="ml-1 mt-25 mb-4"
          />
        )}
        <ul className={styles.filling_ingridients}>
          {otherIngridients &&
            otherIngridients.map((ingridient, index) => (
              <li
                key={ingridient._id}
                className={styles.filling_ingridients_item}
              >
                <DragIcon />
                <ConstructorElement
                  text={ingridient.name}
                  price={ingridient.price}
                  thumbnail={ingridient.image}
                />
              </li>
            ))}
        </ul>
        {bunIngridient && (
          <ConstructorElement
            type="bottom"
            text={`${bunIngridient.name} (низ)`}
            price={bunIngridient.price}
            isLocked={true}
            thumbnail={bunIngridient.image}
            extraClass="ml-1 mt-4 mb-4"
          />
        )}
        <div className={`${styles.accept_order} mt-6 mr-15`}>
          <div className={styles.totals}>
            <span className="text text_type_digits-medium">{orderSumm}</span>
            <CurrencyIcon />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={acceptOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

BurgerConstructor.propTypes = {
  ingridients: propTypes.array.isRequired,
};

export default BurgerConstructor;
