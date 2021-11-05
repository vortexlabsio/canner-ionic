import { SyntheticEvent, useState } from "react";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonPage,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

import { Link } from "react-router-dom";

import { resetPassword } from "../auth";

import "./Form.css";

export const ResetPassword = () => {
  const [email, setEmail] = useState<string>();
  const [formErrors, setFormErrors] = useState<Error>();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setEmail("");
      alert("Password reset email sent");
    } catch (e) {
      const err = e as Error;
      setFormErrors(err);
      console.log(formErrors);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/"} />
          </IonButtons>
          <IonTitle>Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <form onSubmit={(e) => handleSubmit(e)} action="post">
          <IonList>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value as string)}
              />
            </IonItem>
            <IonButton expand="block" type="submit">
              Reset Password
            </IonButton>
          </IonList>
        </form>
        <div className="below-form">
          <Link to="/login">Back to login</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
