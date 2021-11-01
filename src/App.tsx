import React, { Suspense } from "react";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@ionic-native/splash-screen";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { PublicRoutes, PrivateRoutes } from "./routes";

// Hide the splash (you should do this on app launch)
SplashScreen.hide();

const App: React.FunctionComponent = () => {
  const [user] = useAuthState(auth);

  return (
    <IonApp>
      <IonReactRouter>
        <Suspense fallback={<IonLoading isOpen={true} />}>
          {user ? <PrivateRoutes /> : <PublicRoutes />}
        </Suspense>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
