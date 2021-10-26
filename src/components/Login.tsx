import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, emailAndPasswordSignIn, signInWithFacebook, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, } from '@ionic/react';

import "./Login.css";
import { personCircle } from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/profile");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <IonRow>
          <IonCol>
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle}
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={() => emailAndPasswordSignIn(email, password)}>
              Login
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <hr />
            <p>Or</p>
            <hr />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton className="login__google" expand="block" onClick={signInWithGoogle} >
              Login with Google
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton className="login__facebook" expand="block" onClick={signInWithFacebook} >
              Login with Facebook 
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <p style={{ fontSize: "medium" }}>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </IonCol>
        </IonRow>

      </div>
    </div>
  );
}

export default Login;