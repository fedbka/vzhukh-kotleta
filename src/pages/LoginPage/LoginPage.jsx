import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/actions/authentication";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then(() => {
      location.state && location.state.from && navigate(location.state.from);
    });
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={onSubmitFormHandler} autoComplete="off">
        <EmailInput name="email" value={formData.email} onChange={onChangeValuesHandler} autoComplete="off" />
        <PasswordInput name="password" value={formData.password} onChange={onChangeValuesHandler} autoComplete="off" />
        <Button htmlType="submit" type="primary" extraClass={styles.submitButton}>
          Войти
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className={styles.additionalAction}>
          Вы — новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.additionalAction}>
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
