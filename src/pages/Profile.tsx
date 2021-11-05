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
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { BackendContext, logout } from "../State";
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

  const doLogout = useCallback(async () => {
    dispatch(logout());
    history.push(urls.LOGIN);
  }, [dispatch, history]);

  console.log(state);

  return (
    <IonPage>
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
    </IonPage>
  );
};

export default Profile;
