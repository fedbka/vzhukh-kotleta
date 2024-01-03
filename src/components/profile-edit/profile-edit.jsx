import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./profile-edit.module.css";

const ProfileEdit = () => {
  const storedProfileData = {
    name: "Andrey Fadeyev",
    email: "fadeyeval@outlook.com",
    password: "gfhjkm,0",
  };

  const [profileData, setProfileData] = useState({ ...storedProfileData });

  const OnChangeValuesHandler = (event) => {
    setProfileData((previousProfileData) => ({
      ...previousProfileData,
      [event.target.name]: event.target.value,
    }));
  };

  const ResetChanges = () => setProfileData({ ...storedProfileData });
  console.log(profileData);

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <Input
          name="name"
          value={profileData.name}
          onChange={OnChangeValuesHandler}
          type="text"
          placeholder="Имя"
          icon={
            storedProfileData.name !== profileData.name
              ? "CloseIcon"
              : "EditIcon"
          }
        />
        <EmailInput
          name={"email"}
          value={profileData.email}
          onChange={OnChangeValuesHandler}
          placeholder="Логин"
          icon={
            storedProfileData.email !== profileData.email
              ? "CloseIcon"
              : "EditIcon"
          }
        />
        <PasswordInput
          name={"password"}
          value={profileData.password}
          onChange={OnChangeValuesHandler}
          placeholder="Пароль"
          icon={
            storedProfileData.password !== profileData.password
              ? "CloseIcon"
              : "EditIcon"
          }
          disabled={false}
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
