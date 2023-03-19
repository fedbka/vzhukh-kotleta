import React from "react";
import {ingridients, ingridientsTypes} from "../../utils/data";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingridients={ingridients} ingridientsTypes={ingridientsTypes}/>
        <BurgerConstructor ingridients={ingridients}/>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
