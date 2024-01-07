import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { passwordRecovery, passwordReset } from "../../services/actions/authentication";
import styles from "./PasswordRecoveryPage.module.css";

const PasswordRecoveryPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(passwordRecovery(formData))
      .then(() => navigate('/reset-password'));
  };

  return (
    <main className={styles.page}>
      <h1 className="pt-0 pb-0 text text_type_main-large">Восстановление пароля</h1>
      <form className={styles.form} name="passwordRecovery" onSubmit={onSubmitHandler}>
        <EmailInput name="email" value={formData.email} onChange={onChangeValuesHandler} required />
        <Button type="primary" htmlType="submit" extraClass={styles.submitButton}>
          Восстановить
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default">
          <span className="text text_color_inactive">Вспомнили пароль?</span>
          <Link to="/login" className={`pl-2 text_color_accent ${styles.link}`}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default PasswordRecoveryPage;
