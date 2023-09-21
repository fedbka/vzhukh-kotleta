import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CHOSEN_INGRIDIENT,
  DELETE_CHOSEN_INGRIDIENT,
} from "../../services/actions/chosen-ingridients";
import {
  DECREASE_INGRIDIENT_QUANTITY,
  INCREASE_INGRIDIENT_QUANTITY,
} from "../../services/actions/ingridients";
import { makeOrder } from "../../services/actions/make-order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import DragabbleWrapper from "../dragabbleWrapper/dragabble-wrapper";

function BurgerConstructor() {
  const chosenIngridients = useSelector((store) => store.chosenIngridients);
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();

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

  const orderSumm = useMemo(
    () =>
      chosenIngridients.items.reduce(
        (prev, ingridient) =>
          prev + (ingridient.type === "bun" ? 2 : 1) * ingridient.price,
        0
      ),
    [chosenIngridients]
  );

  const deleteChosenIgridient = function (ingridient) {
    dispatch({
      type: DELETE_CHOSEN_INGRIDIENT,
      item: { ...ingridient },
    });
    dispatch({
      type: DECREASE_INGRIDIENT_QUANTITY,
      item: { ...ingridient },
    });
  };

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

  return (
    <>
      {showModal && (
        <Modal handlerOnClose={() => setShowModal(false)}>
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
          {chosenIngridients.items
            .filter((ingridient) => ingridient.type !== "bun")
            .map((ingridient) => (
              <DragabbleWrapper item={ingridient} key={ingridient.uuid}>
                <li
                  className={styles.filling_ingridients_item}
                >
                  <DragIcon />
                  <ConstructorElement
                    text={ingridient.name}
                    price={ingridient.price}
                    thumbnail={ingridient.image_mobile}
                    handleClose={() => deleteChosenIgridient(ingridient)}
                  />
                </li>
              </DragabbleWrapper>
            ))}
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
            <span className="text text_type_digits-medium">{orderSumm}</span>
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
