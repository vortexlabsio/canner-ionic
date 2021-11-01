import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import LoginComponent from "../components/Login";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar />
      </IonHeader>
      <IonContent>
        <LoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default Login;
