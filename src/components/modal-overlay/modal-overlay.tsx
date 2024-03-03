import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ onClick, children }: { onClick?: () => void, children: JSX.Element }) => {
  return (
    <div className={styles.component} onClick={onClick}>
      {children}
    </div>
  );
};
