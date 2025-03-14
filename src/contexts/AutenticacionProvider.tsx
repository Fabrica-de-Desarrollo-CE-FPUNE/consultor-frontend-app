import React, { ReactNode } from 'react';
import { AutenticacionContext } from './AutenticacionContext';
import { LoginClient } from '../data/fetchers/LoginClient';
import { setInfo, TodaLaInfoStore, vaciarTodaLaInfo } from '../data/TodaLaInfoStore';
import { useIonAlert } from '@ionic/react';
import { addListeners, registerNotifications, unregisterNotifications } from '../services/notificacion';



interface AutenticacionProviderProps {
  children: ReactNode;
}

export const AutenticacionProvider: React.FC<AutenticacionProviderProps> = ({ children }) => {
    
    const loginClient = new LoginClient();
    const todaLaInfo = TodaLaInfoStore.useState(s=>s.todo);
    const [alerta] = useIonAlert();

    const handleNotificaciones = () => {
        registerNotifications().then(()=>{
            addListeners();
          })
    }

    const login = async (usuario: string, clave: string) => {
      const info = await loginClient.post({cedula:usuario, pass:clave});
      setInfo(info);
      handleNotificaciones();
    };

    const logout = () => {

        alerta({
            header: '¿Cerrar sesión?',
            buttons: [
                {
                    text: 'Sí',
                    handler:()=> {
                        vaciarTodaLaInfo();
                        unregisterNotifications();
                    },
                    role:'destructive',
                },
                {
                    text: 'No',
                    role:'cancel'
                },
            ],
          });
    };

    return (
        <AutenticacionContext.Provider value={{ todaLaInfo, login, logout }}>
        {children}
        </AutenticacionContext.Provider>
    );
};
