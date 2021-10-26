import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Login from '../components/Login';
import './Tab1.css';

const Discover: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discover</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonTitle size="small">CDC</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Content here</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>

  );
};

export default Discover;
