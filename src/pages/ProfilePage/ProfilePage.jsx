import styles from "./ProfilePage.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import ProfileEdit from "../../components/profile-edit/profile-edit";

const ProfilePage = () => {
  const pageAnnotation = "В этом разделе вы можете изменить свои персональные данные"; 
  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation={pageAnnotation}/>
      <ProfileEdit/>
    </main>
  );
};

export default ProfilePage;
