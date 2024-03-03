import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { addToCart, removeFromCart, selectCart } from "../../services/store/cart.ts";
import { selectIsAuthenticated } from "../../services/store/user.ts";
import type { TIngredient } from "../../types/types.ts";
import { DragabbleWrapper } from "../dragabble-wrapper/dragabble-wrapper.tsx";
import { Modal } from "../modal/modal.tsx";
import { OrderConfirmation } from "../order-confirmation/order-confirmation.tsx";
import styles from "./cart.module.css";

export const Cart = () => {

  const cartIngredients = useAppSelector(state => selectCart(state));
  const dispatch = useAppDispatch();
  const bunIngredient = cartIngredients.find(ingredient => ingredient.type === 'bun');
  const userIsAuthenticated = useAppSelector(state => selectIsAuthenticated(state));
  const [sendingOrder, showSendingOrder] = useState<boolean>(false);
  const navigate = useNavigate();

  const orderPrice: number = useMemo(
    () => cartIngredients.reduce((prev, ingridient) => prev + (ingridient.type === "bun" ? 2 : 1) * ingridient.price, 0),
    [cartIngredients]
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: TIngredient) {
      dispatch(addToCart({ ...ingredient, uuid: nanoid() }));
    },
  });

  const sendOrderHandler = (): void => {
    if (!userIsAuthenticated) {
      navigate("/login");
      return;
    }
    showSendingOrder(true);
  }

  return (
    <>
      {sendingOrder && (
        <Modal onCloseHandler={() => showSendingOrder(false)}>
          <OrderConfirmation />
        </Modal>
      )}
      <section className={styles.component} ref={dropTarget}>
        {bunIngredient && (
          <ConstructorElement
            type="top"
            text={`${bunIngredient.name} (верх)`}
            price={bunIngredient.price}
            isLocked={true}
            thumbnail={bunIngredient.image_mobile}
            extraClass={styles.constructorElementTop}
          />
        )}
        {!bunIngredient && <div className={styles.constructorElementTop} />}
        <ul className={styles.filling_ingridients}>
          {cartIngredients
            .filter((ingredient) => ingredient.type !== "bun")
            .map((ingredient) => (
              <DragabbleWrapper item={ingredient} key={ingredient.uuid}>
                <li className={styles.filling_ingridients_item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    handleClose={() => dispatch(removeFromCart(ingredient))}
                  />
                </li>
              </DragabbleWrapper>
            ))}
        </ul>
        {bunIngredient && (
          <ConstructorElement
            type="bottom"
            text={`${bunIngredient.name} (низ)`}
            price={bunIngredient.price}
            isLocked={true}
            thumbnail={bunIngredient.image_mobile}
            extraClass={styles.constructorElementBottom}
          />
        )}
        <div className={styles.accept_order}>
          <div className={styles.totals}>
            <span>{orderPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button"
            type="primary"
            size="large"
            onClick={sendOrderHandler}
            disabled={!(cartIngredients.length >= 2 && cartIngredients.find(ingredient => ingredient.type === 'bun'))}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}