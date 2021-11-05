import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

/* Theme variables */
import "./theme/variables.css";

import { home, person, search } from "ionicons/icons";

import Browse from "./pages/Browse";
import Pantry from "./pages/Pantry";
import Profile from "./pages/Profile";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/browse" component={Browse} exact={true} />
        <Route path="/app/pantry" component={Pantry} exact={true} />
        <Route path="/app/profile" component={Profile} />
        <Route
          path="/app/"
          render={() => <Redirect to="/app/browse" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="browse" href="/app/browse">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="pantry" href="/app/pantry">
          <IonIcon icon={search} />
          <IonLabel>Pantry</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
