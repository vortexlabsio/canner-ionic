import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth, logoutUser } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const userDetails = (user: any) => {
  const { uid, displayName, email } = user;
  return (
    <>
      <IonLabel position="floating">User Info</IonLabel>
      <IonRow>
        <IonCol>
          <IonItem>
            <p>{uid}</p>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <p>{displayName}</p>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <p>{email}</p>
          </IonItem>
        </IonCol>
      </IonRow>
    </>
  );
};

const Profile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser();
    history.replace("/");
  };

  const notAuth = () => {
    return (
      <p>
        Woops.. looks like ya need to login
        <a href="/login"></a>
      </p>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return user ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonButton onClick={handleLogout}>Log Out</IonButton>
        </div>
        {userDetails(user)}
      </IonContent>
    </IonPage>
  ) : (
    notAuth()
  );
};

export default Profile;
