import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Order from "../order/order";
import styles from "./orders.module.css";
import propTypes from "prop-types";

const Orders = ({ showStatus = false, reverse = false }) => {
  const { items } = useSelector((store) => store.orders);
  const location = useLocation();
  reverse && items.reverse();
  return (
    <div className={styles.component}>
      <ul className={styles.ordersList}>
        {items?.map((order, index) => (
          <li className={styles.order} key={index}>
            <Link to={`${order.number}`} state={{ background: location, state: order }} className={styles.link}>
              <Order order={order} showStatus={showStatus} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Orders.propTypes = {
  showStatus: propTypes.bool,
  reverse: propTypes.bool,
};

export default Orders;
