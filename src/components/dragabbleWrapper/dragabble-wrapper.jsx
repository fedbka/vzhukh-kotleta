import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { CHANGE_POSITION_OF_CHOSEN_INGRIDIENT } from "../../services/actions/chosen-ingridients";

const DragabbleWrapper = ({ children, item }) => {
  const [, dragRef] = useDrag({
    type: "chosenIngridient",
    item: { ...item },
  });
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "chosenIngridient",
    drop(sourceItem) {
      item.uuid !== sourceItem.uuid &&
        dispatch({
          type: CHANGE_POSITION_OF_CHOSEN_INGRIDIENT,
          target: { ...item },
          source: sourceItem,
        });
    },
  });

  return <div ref={(node) => dragRef(dropRef(node))}>{children}</div>;
};

export default DragabbleWrapper;
