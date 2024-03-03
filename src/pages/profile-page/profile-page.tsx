//import ProfileEdit from "../../components/profile-edit/profile-edit";
import { ProfileEdit } from "../../components/profile-edit/profile-edit.tsx";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation.tsx";
import styles from "./profile-page.module.css";

export const ProfilePage = () => {
  const pageAnnotation =
    "В этом разделе вы можете изменить свои персональные данные";
  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation={pageAnnotation} />
      <ProfileEdit/>
    </main>
  );
};
