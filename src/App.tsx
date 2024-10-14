// src/App.tsx

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
import { cogOutline, documentText, list, personCircle } from 'ionicons/icons';
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

/* Ionic Dark Mode */
/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css'; 
/*import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import { AutenticacionProvider } from './contexts/AutenticacionProvider';
import { TodaLaInfoStore } from './data/TodaLaInfoStore';
import MateriaDetalle from './pages/MateriaDetalle';
import { LoadingProvider } from './contexts/LoadingContext';

setupIonicReact({});

const App: React.FC = () => {

  const existeInfo = TodaLaInfoStore.useState(s=>s.todo)
  

  return (
    <LoadingProvider>
      <AutenticacionProvider>
        <IonApp>
          <IonReactRouter>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/" component={existeInfo ? Rutas : Login} />
          </IonReactRouter>
        </IonApp>
      </AutenticacionProvider>
    </LoadingProvider>
  )
}


const Rutas: React.FC = () => {

  return(
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/perfil" />
        </Route>
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/materias"  component={Materias} />
        <Route exact path="/otros" component={Otros} />
        <Route exact path="/opciones" component={Opciones} />
        <Route path="/materias/:name" component={MateriaDetalle}/>
      </IonRouterOutlet>
      <IonTabBar  slot="bottom">
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
  )
}

export default App;
