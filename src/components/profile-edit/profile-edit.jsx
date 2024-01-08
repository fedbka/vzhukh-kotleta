import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../services/actions/authentication";
import styles from "./profile-edit.module.css";

const ProfileEdit = () => {
  const userProfile = useSelector((state) => state.authentication.userProfile);
  const [formData, setformData] = useState({ ...userProfile, password: "" });
  const dispatch = useDispatch();

  const OnChangeValuesHandler = useCallback((event) => {
    setformData((previousformData) => ({
      ...previousformData,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const ResetChanges = useCallback(() => setformData({ ...userProfile, password: "" }), [userProfile]);

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <Input
          name="name"
          value={formData.name}
          onChange={OnChangeValuesHandler}
          type="text"
          placeholder="Имя"
          icon={formData.name !== userProfile.name ? "CloseIcon" : "EditIcon"}
        />
        <EmailInput
          name="email"
          value={formData.email}
          onChange={OnChangeValuesHandler}
          placeholder="Логин"
          icon={formData.email !== userProfile.email ? "CloseIcon" : "EditIcon"}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={OnChangeValuesHandler}
          placeholder="Пароль"
          icon="EditIcon"
          autoComplete="off"
        />
        { (formData.name !== userProfile.name || formData.email !== userProfile.email || formData.password) && (
          <div className={styles.formButtons}>
            <Button htmlType="button" type="secondary" onClick={ResetChanges}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </div>)
        }
      </form>
    </div>
  );
};

export default ProfileEdit;
