import { useCallback, useContext } from "react";

import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonButtons,
  IonButton,
  IonIcon,
  useIonPopover,
  IonContent,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { BackendContext, logout, getRecipes } from "../State";
import { img } from "../util";
import urls from "../urls";
import { useHistory } from "react-router";

const PopoverList: React.FC<{
  onHide: () => void;
  onLogout: () => void;
}> = ({ onHide, onLogout }) => (
  <IonList>
    <IonListHeader>Ionic</IonListHeader>
    <IonItem button onClick={onLogout}>
      Log Out
    </IonItem>
    <IonItem lines="none" detail={false} button onClick={onHide}>
      Close
    </IonItem>
  </IonList>
);

const Profile: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(BackendContext);
  const [present, dismiss] = useIonPopover(PopoverList, {
    onHide: () => dismiss(),
    onLogout: () => doLogout(),
  });

  const recipes = getRecipes(state);

  const doLogout = useCallback(async () => {
    dismiss();
    dispatch(logout());
    history.push(urls.LOGIN);
  }, [dispatch, history]);

  console.log(state);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Your Recipes</IonTitle>
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                onClick={(e) => present({ event: e.nativeEvent })}
              >
                <IonIcon icon={ellipsisVertical} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Recipes</IonLabel>
          </IonListHeader>
          {recipes.map((recipe) => (
            <IonItem key={recipe.id}>
              <IonThumbnail slot="start">
                <img src={img(recipe.img)} />
              </IonThumbnail>
              <IonLabel>
                <h2>{recipe.title}</h2>
                <h3>{recipe.author}</h3>
                <p>{recipe.text}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
