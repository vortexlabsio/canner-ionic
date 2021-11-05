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

import { signup } from "../auth";

import urls from "../urls";

import "./Form.css";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const { dispatch } = useContext(BackendContext);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Error>();
  const [showLoading, setShowLoading] = useState(false);
  const formRef = useRef(null);

  const goTo = (e: SyntheticEvent, path: string) => {
    e.preventDefault();
    history.push(path, { direction: "forward" });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);
      const user = await signup(email, password);
      dispatch(loggedIn(user));
      history.replace(urls.APP_HOME);
      setShowLoading(false);
    } catch (e) {
      const err = e as Error;
      setShowLoading(false);
      setFormErrors(err);
      console.log(formErrors);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/`} />
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <IonLoading
          isOpen={showLoading}
          message="Creating account..."
          onDidDismiss={() => setShowLoading(false)}
        />
        <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
          <IonList>
            <IonItem>
              <IonLabel position={"fixed"}>Name</IonLabel>
              <IonInput
                name="name"
                type="text"
                value={name}
                onInput={(e) => setName(e.currentTarget.value as string)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={"fixed"}>Username</IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                onInput={(e) => setUsername(e.currentTarget.value as string)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={"fixed"}>Email</IonLabel>
              <IonInput
                name="email"
                type="email"
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value as string)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={"fixed"}>Password</IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value as string)}
              />
            </IonItem>
            <IonButton expand="block" type="submit">
              Sign up
            </IonButton>
          </IonList>
        </form>
        <div className="below-form">
          <a
            href="#/"
            onClick={(e) => {
              goTo(e, "/login");
            }}
          >
            Already have an account? Log in
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
