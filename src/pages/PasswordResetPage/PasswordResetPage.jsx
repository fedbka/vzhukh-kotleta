import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./PasswordResetPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const PasswordResetPage = () => {
  const [formData, setFormData] = useState({password: '', recoveryCode: ''});

  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className={styles.page}>
      <h1 className="pt-0 pb-0 text text_type_main-large">
        Восстановление пароля
      </h1>
      <form className={styles.form}>
        <PasswordInput name='password' value={formData.password} placeholder="Введите новый пароль" onChange={onChangeValuesHandler}/>
        <Input name='recoveryCode' value={formData.recoveryCode} placeholder="Введите код из письма" onChange={onChangeValuesHandler}/>
        <Button
          type="primary"
          htmlType="submit"
          extraClass={styles.submitButton}
        >
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
