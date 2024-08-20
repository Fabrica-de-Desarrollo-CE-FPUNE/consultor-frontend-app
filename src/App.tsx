import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cogOutline, documentText, ellipse, list, logoAlipay, personCircle, personCircleOutline, square, triangle } from 'ionicons/icons';
import Perfil from './pages/Perfil';
import Materias from './pages/Materias';
import Otros from './pages/Otros';
import Opciones from './pages/Opciones';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route exact path="/perfil">
            <Perfil />
          </Route>
          <Route exact path="/materias">
            <Materias />
          </Route>
          <Route path="/otros">
            <Otros />
          </Route>
          <Route path="/opciones">
            <Opciones />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="perfil" href="/perfil">
            <IonIcon aria-hidden="true" icon={personCircle} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="materias" href="/materias">
            <IonIcon aria-hidden="true" icon={documentText} />
            <IonLabel>Materias</IonLabel>
          </IonTabButton>
          <IonTabButton tab="otros" href="/otros">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>Otros</IonLabel>
          </IonTabButton>
          <IonTabButton tab="opciones" href="/opciones">
            <IonIcon aria-hidden="true" icon={cogOutline} />
            <IonLabel>Opciones</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
