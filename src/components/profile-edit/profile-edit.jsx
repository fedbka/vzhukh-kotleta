import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import styles from "./profile-edit.module.css";
import { useSelector } from "react-redux";

const ProfileEdit = () => {
  const userProfile = useSelector((state) => state.authentication.userProfile);

  const [formData, setformData] = useState({ ...userProfile });

  const OnChangeValuesHandler = useCallback((event) => {
    setformData((previousformData) => ({
      ...previousformData,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const ResetChanges = useCallback(() => setformData({ ...userProfile }), [userProfile]);

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <Input
          name="name"
          value={formData.name}
          onChange={OnChangeValuesHandler}
          type="text"
          placeholder="Имя"
          icon={
            formData.name !== userProfile.name
              ? "CloseIcon"
              : "EditIcon"
          }
        />
        <EmailInput
          name="email"
          value={formData.email}
          onChange={OnChangeValuesHandler}
          placeholder="Логин"
          icon={
            formData.email !== userProfile.email
              ? "CloseIcon"
              : "EditIcon"
          }
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={OnChangeValuesHandler}
          placeholder="Пароль"
          icon="EditIcon"
          autoComplete="off"
        />
        <div className={styles.formButtons}>
          <Button htmlType="button" type="secondary" onClick={ResetChanges}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
