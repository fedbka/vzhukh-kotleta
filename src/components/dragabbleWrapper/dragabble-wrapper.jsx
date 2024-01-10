import propTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { changePositoinOfChesenIngridient } from "../../services/actions/chosen-ingridients";

const DragabbleWrapper = ({ children, item }) => {
  const [, dragRef] = useDrag({
    type: "chosenIngridient",
    item: { ...item },
  });
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "chosenIngridient",
    drop(sourceItem) {
      item.uuid !== sourceItem.uuid && dispatch(changePositoinOfChesenIngridient({ ...item }, sourceItem));
    },
  });

  return <div ref={(node) => dragRef(dropRef(node))}>{children}</div>;
};

DragabbleWrapper.propTypes = {
  item: propTypes.object.isRequired,
  children: propTypes.any,
};

export default DragabbleWrapper;
