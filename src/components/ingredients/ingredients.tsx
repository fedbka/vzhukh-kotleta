import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/store.ts';
import { useGetIngredientsQuery } from '../../services/api/ingredients.ts';
import { selectIngredients } from '../../services/store/ingredients.ts';
import { ingredientKinds } from '../../services/utils/utils.ts';
import { TKindOfIngredient } from '../../types/types.ts';
import { Ingridient } from '../ingredient/ingredient.tsx';
import styles from './ingredients.module.css';

export const Ingredients = () => {

  const ingredients = useAppSelector(state => selectIngredients(state));
  const { isLoading, isError, isSuccess } = useGetIngredientsQuery();

  const [currentKind, setCurrentKind] = useState<TKindOfIngredient>('bun');

  const refIngredients = useRef<HTMLUListElement>(null);
  const refBunTab = useRef<HTMLLIElement>(null);
  const refSauceTab = useRef<HTMLLIElement>(null);

  const onScrollHandler: React.UIEventHandler<HTMLUListElement> = useCallback(() => {
    const topOfIngridientsList = refIngredients.current ? refIngredients.current.getBoundingClientRect().top : 0;
    const topOfBunTab = refBunTab.current ? refBunTab.current.getBoundingClientRect().top : 0;
    const topOfSauceTab = refSauceTab.current ? refSauceTab.current?.getBoundingClientRect().top : 0;

    let ingridientKind: TKindOfIngredient = "bun";
    if (topOfSauceTab < topOfIngridientsList) {
      ingridientKind = "main";
    } else if (topOfBunTab < topOfIngridientsList) {
      ingridientKind = "sauce";
    }

    if (currentKind !== ingridientKind) {
      setCurrentKind(ingridientKind);
    }

  }, [currentKind]);

  return (
    <section className={styles.component}>
      {isLoading && <h1>Загрузка данных...</h1>}
      {isError && <h1>Ошибка загрузки данных...</h1>}
      {isSuccess && (
        <>
          <ul className={styles.tabs}>
            {ingredientKinds.map((kindOfIngredient, index) => (
              <li key={index} className={styles.tab}>
                <Tab active={currentKind === kindOfIngredient.id} value={kindOfIngredient.name} onClick={() => { }}>
                  {kindOfIngredient.name}
                </Tab>
              </li>
            ))}
          </ul>
          <ul className={styles.ingredients_list} ref={refIngredients} onScroll={onScrollHandler}>
            {ingredientKinds.map((kindOfIngredient, index) => (
              <li key={index} ref={kindOfIngredient.id === "bun" ? refBunTab : kindOfIngredient.id === "sauce" ? refSauceTab : null}>
                <h2 className={styles.kind_of_ingredient}>{kindOfIngredient.name}</h2>
                <ul className={styles.ingredients_list2}>
                  {ingredients?.filter(ingredient => ingredient.type === kindOfIngredient.id).map(ingredient => <Ingridient key={ingredient._id} data={ingredient} />)}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}