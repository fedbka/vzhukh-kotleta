import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./PasswordResetPage.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../services/actions/authentication";

const PasswordResetPage = () => {
  const [formData, setFormData] = useState({ password: "", token: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    dispatch(passwordReset(formData))
      .then(() => navigate('/login'));    
  }

  const passwordResetCodeSent = useSelector((store) => store.authentication.passwordResetCodeSent);
  
  return (
    <main className={styles.page}>
      {!passwordResetCodeSent && <Navigate to='/forgot-password' />}
      <h1 className="pt-0 pb-0 text text_type_main-large">Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmitFormHandler}>
        <PasswordInput
          name="password"
          value={formData.password}
          placeholder="Введите новый пароль"
          onChange={onChangeValuesHandler}
        />
        <Input
          name="token"
          value={formData.token}
          placeholder="Введите код из письма"
          onChange={onChangeValuesHandler}
        />
        <Button type="primary" htmlType="submit" extraClass={styles.submitButton}>
          Сохранить
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default">
          <span className="text_color_inactive">Вспомнили пароль?</span>
          <Link to="/login" className={`pl-2 text_color_accent ${styles.link}`}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default PasswordResetPage;
