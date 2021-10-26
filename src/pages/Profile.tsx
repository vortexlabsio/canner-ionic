import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../firebase';

const Profile: React.FC = () => {
  const handleLogout = () => {
    logout();
    <Redirect to='/' />
    
  } 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonTitle size="small">Small Title above a Default Title</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonButton onClick={handleLogout}>Log Out</IonButton>
        </div>
      </IonContent>
    </IonPage>

  );
};

export default Profile;
