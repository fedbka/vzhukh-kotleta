import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './RegistrationPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const onChangeValuesHandler = (event) => {
    setFormData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className={styles.page}>
      <h1 className='pt-0 pb-0 text text_type_main-large'>Регистрация</h1>
      <form className={styles.form}>
        <Input name='name' value={formData.name} onChange={onChangeValuesHandler} placeholder='Имя' />
        <EmailInput name='email' value={formData.email} onChange={onChangeValuesHandler} />
        <PasswordInput name='password' value={formData.password} onChange={onChangeValuesHandler} />
        <Button
          type='primary'
          htmlType='submit'
          extraClass={styles.submitButton}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className='text text_type_main-default'>
          <span className='text_color_inactive'>Уже зарегистрированы?</span>
          <Link to='/login' className={`pl-2 text_color_accent ${styles.link}`}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegistrationPage;
