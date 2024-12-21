import React, { ReactNode } from 'react';
import { AutenticacionContext } from './AutenticacionContext';
import { LoginClient } from '../data/fetchers/LoginClient';
import { setInfo, TodaLaInfoStore, vaciarTodaLaInfo } from '../data/TodaLaInfoStore';
import { ErrorMessageServer } from '../data/types';
import { useIonAlert } from '@ionic/react';



interface AutenticacionProviderProps {
  children: ReactNode;
}

export const AutenticacionProvider: React.FC<AutenticacionProviderProps> = ({ children }) => {
    
    const loginClient = new LoginClient();
    const todaLaInfo = TodaLaInfoStore.useState(s=>s.todo);
    const [alerta] = useIonAlert();

    const login = async (usuario: string, clave: string) => {
        
        await loginClient.post({cedula:usuario, pass:clave}).then(async value=>{
            
            if(value && value.info_cabecera){
                TodaLaInfoStore.update(s => {
                    s.todo = value;
                });
                await setInfo(value);
            } else if(value && (value as unknown as ErrorMessageServer).error){
                const error = (value as unknown as ErrorMessageServer).error
                alerta({
                    header: `Ocurrió un error`,
                    subHeader: error.message,
                    message: `Código Error: ${error.errorCode}`,
                    buttons: [
                      {
                        text: 'Salir',
                      },
                    ],
                  })
            }
        }).catch(err=>{
            console.error(err);
            alerta({
                header: `Ocurrió un error`,
                message: 'No se pudo conectar con el servidor, revise su conexión de internet.',
                buttons: [
                  {
                    text: 'Salir'
                  },
                ],
              })
        })
    };

    const logout = () => {

        alerta({
            header: '¿Cerrar sesión?',
            buttons: [
                {
                    text: 'Sí',
                    handler:()=>vaciarTodaLaInfo(),
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
