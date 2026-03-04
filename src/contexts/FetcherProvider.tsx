import React, { ReactNode } from 'react';
import { FetcherContext } from './FetcherContext';
import { useIonAlert } from '@ionic/react';
import { addListeners, registerNotifications } from '../services/notificacion';
import { ApiError } from '../data/fetchers/ApiError';
import { vaciarTokenStore } from '../data/TokenStore';



interface FetcherProviderProps {
    children: ReactNode;
}

export const FetcherProvider: React.FC<FetcherProviderProps> = ({ children }) => {


    const [alerta] = useIonAlert();

    const handleNotificaciones = () => {
        registerNotifications().then(() => {
            addListeners();
        })
    }

    const fetch = async (activeFunction: () => Promise<void>) => {
        try {
            await activeFunction();
            handleNotificaciones();
        } catch (error) {
            if (error instanceof ApiError) {
                alerta({
                    header: 'Ocurrió un error',
                    subHeader: error.message,
                    message: `Código de error: ${error.errorCode}\nCódigo de estado: ${status}`,
                    buttons: ['Cerrar']
                })
            }
        }
    };

    const logout = () => {
        alerta({
            header: 'Cerrar sesión',
            message: '¿Estás seguro de que deseas cerrar sesión?',
            buttons: [
                {
                    text: 'Sí',
                    handler: () => {
                        vaciarTokenStore()
                    }
                },
                {
                    text: 'No',
                    role: 'cancel'
                }
            ]
        });
    }



    return (
        <FetcherContext.Provider value={{ fetch, logout }}>
            {children}
        </FetcherContext.Provider>
    );
};
