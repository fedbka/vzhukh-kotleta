import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ingridientsApi from "../../utils/ingridients-api";

const ingridientsTypes = [
  { id: "bun", name: "Булки" },
  { id: "sauce", name: "Соусы" },
  { id: "main", name: "Начинки" },
];



function App() {
  const [threreIsAError, setError] = React.useState(false);
  const [ingridients, setIngiridients] = React.useState([]);

  React.useEffect(() => {
    ingridientsApi
      .getIngridients()
      .then((response) => setIngiridients(response.data))
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AppHeader />
      <main className={styles.main}>
        {threreIsAError && (
          <div>
            <p>
              Компания Vzhukh Kotleta Inc. временно приостановила работу своих
              заведений в вашей части Галактики.
            </p>
            <p>
              Пожалуйста, зайдите позже - искренне надеемся, что цепочки
              поставок нормализуются, и мы сможем приготовить для вас свои
              знаменитые Вжух-котлеты!
            </p>
          </div>
        )}
        {!threreIsAError && (
          <BurgerIngredients
            ingridients={ingridients}
            ingridientsTypes={ingridientsTypes}
          />
        )}
        {!threreIsAError && <BurgerConstructor ingridients={ingridients} />}
      </main>
    </div>
  );
}

export default App;
