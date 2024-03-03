import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useRecoveryPasswordMutation } from "../../services/api/auth.ts";
import { selectIsAuthenticated, selectIsPasswordRecovered, selectIsRecoveringPassword } from "../../services/store/user.ts";
import styles from "./reset-password-page.module.css";

export const PasswordResetPage = () => {
  const [formData, setFormData] = useState({ password: "", token: "" });
  const userIsRecoveringPassword = useAppSelector(selectIsRecoveringPassword);
  const userIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const userIsPasswordRecovered = useAppSelector(selectIsPasswordRecovered);

  const [passwordRecovery,] = useRecoveryPasswordMutation();

  const navigate = useNavigate();

  const onChangeValuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitFormHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    passwordRecovery({ ...formData });
  };

  useEffect(() => {
    if (userIsAuthenticated || userIsPasswordRecovered) navigate("/login");
    else if (!userIsRecoveringPassword && !userIsPasswordRecovered) navigate("/forgot-password");

  }, [userIsRecoveringPassword, userIsAuthenticated, userIsPasswordRecovered, navigate])

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Восстановление пароля</h1>
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
        <p className={styles.additionalAction}>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};