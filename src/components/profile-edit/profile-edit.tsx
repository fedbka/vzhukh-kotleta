import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/store.ts";
import { useUpdateUserMutation } from "../../services/api/auth.ts";
import { selectUser } from "../../services/store/user.ts";
import { TUpdateUserRequest } from "../../types/types.ts";
import styles from "./profile-edit.module.css";

export const ProfileEdit = () => {
  const userProfile = useAppSelector((state) => selectUser(state));
  const [formData, setformData] = useState<TUpdateUserRequest>({ ...userProfile, password: "" });

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => setformData({ ...userProfile, password: "" }), [setformData, userProfile]);

  const onSubmitFormHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    updateUser({...formData});
  };

  const onChangeValuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setformData((previousformData) => ({
      ...previousformData,
      [event.target.name]: event.target.value,
    }));
  }

  const resetChanges = () => setformData({ ...userProfile, password: "" });

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={onSubmitFormHandler}>
        <Input
          name="name"
          value={formData.name}
          onChange={onChangeValuesHandler}
          type="text"
          placeholder="Имя"
          icon={formData.name !== userProfile.name ? "CloseIcon" : "EditIcon"}
        />
        <EmailInput
          name="email"
          value={formData.email}
          onChange={onChangeValuesHandler}
          placeholder="Логин"
          icon={formData.email !== userProfile.email ? "CloseIcon" : "EditIcon"}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={onChangeValuesHandler}
          placeholder="Пароль"
          icon="EditIcon"
          autoComplete="off"
        />
        {(formData.name !== userProfile.name || formData.email !== userProfile.email || formData.password) && (
          <div className={styles.formButtons}>
            <Button htmlType="button" type="secondary" onClick={resetChanges}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

