import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { search, briefcaseOutline, fileTrayFullOutline, personCircleOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Collections from "./pages/Collections";
import Discover from "./pages/Discover";
import Pantry from "./pages/Pantry";
import Profile from "./pages/Profile";
import Login from "./components/Login";

const Routes: React.FC = () => (
    <IonReactRouter>
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/"><Redirect to="/login" /></Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/discover" component={Discover} />
                <Route exact path="/collections" component={Collections} />
                <Route exact path="/pantry" component={Pantry} />
                <Route exact path="/profile" component={Profile} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="discover" href="/discover">
                    <IonIcon icon={search} />
                    <IonLabel>Discover</IonLabel>
                </IonTabButton>
                <IonTabButton tab="collections" href="/collections">
                    <IonIcon icon={briefcaseOutline} />
                    <IonLabel>Collections</IonLabel>
                </IonTabButton>
                <IonTabButton tab="pantry" href="/pantry">
                    <IonIcon icon={fileTrayFullOutline} />
                    <IonLabel>Pantry</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={personCircleOutline} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonReactRouter>
);

export default Routes;