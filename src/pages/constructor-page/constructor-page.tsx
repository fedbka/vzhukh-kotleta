import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Cart } from "../../components/cart/cart.tsx";
import { Ingredients } from "../../components/ingredients/ingredients.tsx";
import styles from "./constructor-page.module.css";

export const ConstructorPage = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <Ingredients />
          <Cart />
        </DndProvider>
      </div>
    </main>
  );
} 