import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({name: '',password:''});

  const OnChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className={styles.page} >
      <h1 className='pt-0 pb-0 text text_type_main-large'>Вход</h1>
      <form className={styles.form}>
        <EmailInput name='name' value={formData.name} onChange={OnChangeValuesHandler}/>
        <PasswordInput name='password' value={formData.password} onChange={OnChangeValuesHandler}/>
        <Button
          type='primary'
          htmlType='button'
          extraClass={styles.submitButton}
        >
          Войти
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className='text text_type_main-default'>
          <span className='text_color_inactive'>Вы — новый пользователь?</span>
          <Link
            to='/register'
            className={`pl-2 text_color_accent ${styles.link}`}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          <span>Забыли пароль?</span>
          <Link
            to='/forgot-password'
            className={`pl-2 text_color_accent ${styles.link}`}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
