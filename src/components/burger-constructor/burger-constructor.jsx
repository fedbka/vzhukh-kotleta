import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import {
  IngridientsContext,
  OrderContext,
  orderDataInitialState,
} from "../../utils/app-context";
import Api from "../../utils/api";

function BurgerConstructor() {
  const [orderSumm, setOrderSumm] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [orderData, setOrderData] = React.useState(orderDataInitialState);

  const placeOrder = () => {
    setShowModal(true);
    Api.getOrderDetails({
      ingredients: [
        bunIngridient._id,
        ...otherIngridients.map((ingridient) => ingridient._id),
        bunIngridient._id,
      ],
    })
      .then((response) =>
        setOrderData({
          name: response.name,
          number: response.order.number,
        })
      )
      .catch((err) => console.log(err.json()));
  };

  const handlerCloseModal = () => {
    setShowModal(false);
    setOrderData(orderDataInitialState);
  };
  const { ingridients } = React.useContext(IngridientsContext);

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
        : 0) + (bunIngridient ? bunIngridient.price * 2 : 0)
    );
  }

  React.useEffect(() => setOrderSumm(getOrderSumm()), [ingridients]);

  return (
    <>
      {showModal && (
        <OrderContext.Provider value={{ orderData, setOrderData }}>
          <Modal handlerOnClose={handlerCloseModal}>
            <OrderDetails />
          </Modal>
        </OrderContext.Provider>
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
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={placeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;
