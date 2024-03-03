import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useResetPasswordMutation } from "../../services/api/auth.ts";
import { selectIsAuthenticated, selectIsRecoveringPassword } from "../../services/store/user.ts";
import styles from "./forgot-password-page.module.css";

export const PasswordRecoveryPage = () => {

  const [formData, setFormData] = useState<{ email: string }>({ email: "" });
  const userIsRecoveringPassword = useAppSelector(selectIsRecoveringPassword);
  const userIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const onChangeValuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitFormHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    resetPassword({ ...formData });
  };

  useEffect(() => {
    if (userIsAuthenticated) navigate("/");
    else if (userIsRecoveringPassword) navigate("/reset-password");
  }, [userIsRecoveringPassword, userIsAuthenticated, navigate])


  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} name="passwordRecovery" onSubmit={onSubmitFormHandler}>
        <EmailInput name="email" value={formData.email} onChange={onChangeValuesHandler} required />
        <Button type="primary" htmlType="submit" extraClass={styles.submitButton}>
          Восстановить
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
