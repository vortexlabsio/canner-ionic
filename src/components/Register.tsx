import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  emailAndPasswordRegistration,
  signInWithFacebook,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";

import "./Login.css";
import "./Register.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    emailAndPasswordRegistration(name, email, password);
  };

  useEffect(() => {
    if (user) {
      history.replace("/profile");
    }
  }, [user]);

  return loading ? (
    <p>Loading...</p>
  ) : (
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
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="text"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              ></IonInput>
            </IonItem>
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
              ></IonInput>
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
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <button className="register__btn" onClick={register}>
          Register
        </button>

        <IonRow>
          <IonCol>
            <hr />
            <p>Or</p>
            <hr />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton
              className="login__google"
              expand="block"
              onClick={signInWithGoogle}
            >
              Sign Up with Google
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton
              className="login__facebook"
              expand="block"
              onClick={signInWithFacebook}
            >
              Sign Up with Facebook
            </IonButton>
          </IonCol>
        </IonRow>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
};

export default Register;
