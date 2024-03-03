import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useLoginUserMutation } from "../../services/api/auth.ts";
import { selectIsAuthenticated } from "../../services/store/user.ts";
import { TLoginUserRequest } from "../../types/types.ts";
import styles from "./login-page.module.css";

export const LoginPage = () => {

  const [formData, setFormData] = useState<TLoginUserRequest>({ email: "", password: "" });
  const userIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  const [loginUser,] = useLoginUserMutation();

  const onSubmitFormHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginUser({ ...formData });
  }

  const onChangeValuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    if (location.state?.from && userIsAuthenticated) navigate(location.state.from);
    else if (userIsAuthenticated) navigate("/");
  }, [location.state, userIsAuthenticated, navigate])

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
}