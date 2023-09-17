import React from "react";
import { useDrop, useDrag } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { makeOrder } from "../../services/actions/make-order";
import {
  ADD_CHOSEN_INGRIDIENT,
  DELETE_CHOSEN_INGRIDIENT,
} from "../../services/actions/chosen-ingridients";
import {
  DECREASE_INGRIDIENT_QUANTITY,
  INCREASE_INGRIDIENT_QUANTITY,
} from "../../services/actions/ingridients";
function BurgerConstructor() {
  const chosenIngridients = useSelector((state) => state.chosenIngridients);
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();

  const makeNewOrder = () => {
    setShowModal(true);
    dispatch(
      makeOrder({
        ingredients: [
          ...chosenIngridients.items.map((ingridient) => ingridient._id),
        ],
      })
    );
  };

  const handlerCloseModal = () => {
    setShowModal(false);
  };

  const bunIngridient = chosenIngridients.items.find(
    (ingridient) => ingridient.type === "bun"
  );

  const [, dropTarget] = useDrop({
    accept: "ingridient",
    drop(ingridient) {
      dispatch({
        type: ADD_CHOSEN_INGRIDIENT,
        item: { ...ingridient },
      });
      dispatch({
        type: INCREASE_INGRIDIENT_QUANTITY,
        item: { ...ingridient },
      });
    },
  });

  function getOrderSumm() {
    return (
      (chosenIngridients.items && chosenIngridients.items.length
        ? chosenIngridients.items.reduce((prev, ingridient) => {
            return prev + ingridient.price;
          }, 0)
        : 0) + (bunIngridient ? bunIngridient.price : 0)
    );
  }

  function deleteChosenIgridient(ingridient, index) {
    dispatch({
      type: DELETE_CHOSEN_INGRIDIENT,
      index,
    });
    dispatch({
      type: DECREASE_INGRIDIENT_QUANTITY,
      item: { ...ingridient },
    });
  }

  return (
    <>
      {showModal && (
        <Modal handlerOnClose={handlerCloseModal}>
          <OrderDetails />
        </Modal>
      )}
      <section className={styles.component} ref={dropTarget}>
        {bunIngridient && (
          <ConstructorElement
            type="top"
            text={`${bunIngridient.name} (верх)`}
            price={bunIngridient.price}
            isLocked={true}
            thumbnail={bunIngridient.image_mobile}
            extraClass="ml-1 mt-25 mb-4"
          />
        )}
        <ul className={styles.filling_ingridients}>
          {chosenIngridients.items &&
            chosenIngridients.items.map(
              (ingridient, index) =>
                ingridient.type !== "bun" && (
                  <li key={index} className={styles.filling_ingridients_item}>
                    <DragIcon />
                    <ConstructorElement
                      text={ingridient.name}
                      price={ingridient.price}
                      thumbnail={ingridient.image_mobile}
                      handleClose={() =>
                        deleteChosenIgridient(ingridient, index)
                      }
                    />
                  </li>
                )
            )}
        </ul>
        {bunIngridient && (
          <ConstructorElement
            type="bottom"
            text={`${bunIngridient.name} (низ)`}
            price={bunIngridient.price}
            isLocked={true}
            thumbnail={bunIngridient.image_mobile}
            extraClass="ml-1 mt-4 mb-4"
          />
        )}
        <div className={`${styles.accept_order} mt-6 mr-15`}>
          <div className={styles.totals}>
            <span className="text text_type_digits-medium">
              {getOrderSumm()}
            </span>
            <CurrencyIcon />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={makeNewOrder}
            disabled={!(chosenIngridients.items.length >= 2)}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;
