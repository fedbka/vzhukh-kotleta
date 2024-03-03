import { useDrag, useDrop } from "react-dnd"
import type { TCartIngredient } from "../../types/types.ts"
import { useAppDispatch } from "../../hooks/store.ts";
import { changePositionInCart } from "../../services/store/cart.ts";

export const DragabbleWrapper = ({ children, item }: { children: JSX.Element, item: TCartIngredient }) => {

  const dispatch = useAppDispatch();

  const [, dragRef] = useDrag({
    type: "cartIngredient",
    item: { ...item },
  });

  const [, dropRef] = useDrop({
    accept: "cartIngredient",
    drop(sourceItem: TCartIngredient) {
      item.uuid !== sourceItem.uuid && dispatch(changePositionInCart({ target: { ...item }, source: sourceItem }));
    }
  });

  return (
    <div ref={(node) => dragRef(dropRef(node))}>{children}</div>
  )

} 