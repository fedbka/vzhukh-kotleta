import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUserProfile } from "../../services/actions/authentication";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    dispatch(registerUserProfile(formData));
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} name="userRegistration" onSubmit={onSubmitForm} autoComplete="off">
        <Input
          name="name"
          value={formData.name}
          onChange={onChangeValuesHandler}
          placeholder="Имя"
          required
          autoComplete="off"
        />
        <EmailInput name="email" value={formData.email} onChange={onChangeValuesHandler} required autoComplete="off" />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={onChangeValuesHandler}
          required
          autoComplete="off"
        />
        <Button type="primary" htmlType="submit" extraClass={styles.submitButton}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className={styles.additionalAction}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegistrationPage;
