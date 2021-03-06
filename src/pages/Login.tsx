import { SyntheticEvent, useContext, useRef, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
} from "@ionic/react";

import { BackendContext, loggedIn } from "../State";

import { login } from "../auth";
import urls from "../urls";

import "./Form.css";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(BackendContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [formErrors, setFormErrors] = useState<Error>();
  const [showLoading, setShowLoading] = useState(false);
  const formRef = useRef(null);

  const goTo = (path: string) => {
    history.push(path, { direction: "forward" });
  };

  const handleGoTo = (e: SyntheticEvent, path: string) => {
    e.preventDefault();
    goTo(path);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);
      const user = await login(email, password);
      dispatch(loggedIn(user));
      history.replace(urls.APP_HOME);
      setShowLoading(false);
    } catch (e) {
      const err = e as Error;
      console.error(e);
      setShowLoading(false);
      setFormErrors(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/"} />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <IonLoading
          isOpen={showLoading}
          message="Logging in..."
          onDidDismiss={() => setShowLoading(false)}
        />
        <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
          {formErrors ? (
            <IonList>
              <IonItem>JSON.stringify(formErrors)</IonItem>
            </IonList>
          ) : null}
          <IonList>
            <IonItem>
              <IonLabel position={"fixed"}>Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onInput={(e: SyntheticEvent<HTMLIonInputElement>) =>
                  setEmail(e.currentTarget.value as string)
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position={"fixed"}>Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onInput={(e: SyntheticEvent<HTMLIonInputElement>) =>
                  setPassword(e.currentTarget.value as string)
                }
              />
            </IonItem>
            <IonButton expand="block" type="submit">
              Log in
            </IonButton>
          </IonList>
        </form>
        <div className="below-form">
          <a
            className="create"
            href="#/"
            onClick={(e: SyntheticEvent) => handleGoTo(e, "/signup")}
          >
            Create account instead
          </a>
          <a
            href="#/"
            onClick={(e: SyntheticEvent) => handleGoTo(e, "/reset-password")}
          >
            Forgot your password?
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
