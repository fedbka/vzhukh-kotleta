import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addChosenIngridient, deleteChosenIngridient } from "../../services/actions/chosen-ingridients";
import { decreaseIngridientQuantity, increaseIngridientQuantity } from "../../services/actions/ingridients";
import { makeOrder } from "../../services/actions/make-order";
import DragabbleWrapper from "../dragabbleWrapper/dragabble-wrapper";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const chosenIngridients = useSelector((store) => store.chosenIngridients);
  const userAuthenticated = useSelector((store) => store.authentication.userAuthenticated);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bunIngridient = chosenIngridients.items.find((ingridient) => ingridient.type === "bun");

  const [, dropTarget] = useDrop({
    accept: "ingridient",
    drop(ingridient) {
      dispatch(addChosenIngridient({ ...ingridient, uuid: uuidv4() }));
      dispatch(increaseIngridientQuantity(ingridient));
    },
  });

  const orderSumm = useMemo(
    () =>
      chosenIngridients.items.reduce(
        (prev, ingridient) => prev + (ingridient.type === "bun" ? 2 : 1) * ingridient.price,
        0
      ),
    [chosenIngridients]
  );

  const deleteChosenIgridientHandler = (ingridient) => {
    dispatch(deleteChosenIngridient({ ...ingridient }));
    dispatch(decreaseIngridientQuantity(ingridient));
  };

  const makeNewOrder = () => {
    if (!userAuthenticated) {
      navigate("/login");
      return;
    }
    setShowModal(true);
    dispatch(
      makeOrder({
        ingredients: [...chosenIngridients.items.map((ingridient) => ingridient._id)],
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
            extraClass={styles.constructorElementTop}
          />
        )}
        <ul className={styles.filling_ingridients}>
          {chosenIngridients.items
            .filter((ingridient) => ingridient.type !== "bun")
            .map((ingridient) => (
              <DragabbleWrapper item={ingridient} key={ingridient.uuid}>
                <li className={styles.filling_ingridients_item}>
                  <DragIcon />
                  <ConstructorElement
                    text={ingridient.name}
                    price={ingridient.price}
                    thumbnail={ingridient.image_mobile}
                    handleClose={() => deleteChosenIgridientHandler(ingridient)}
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
            extraClass={styles.constructorElementBottom}
          />
        )}
        <div className={styles.accept_order}>
          <div className={styles.totals}>
            <span>{orderSumm}</span>
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
};

export default BurgerConstructor;
