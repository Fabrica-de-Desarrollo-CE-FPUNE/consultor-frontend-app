import React, { ReactNode, useEffect } from 'react';
import { AutenticacionContext } from './AutenticacionContext';
import { LoginClient } from '../data/fetchers/LoginClient';
import { TodaLaInfoStore, vaciarTodaLaInfo } from '../data/TodaLaInfoStore';
import { ErrorMessageServer, TodaLaInfo } from '../data/types';
import { useIonAlert } from '@ionic/react';



interface AutenticacionProviderProps {
  children: ReactNode;
}

export const AutenticacionProvider: React.FC<AutenticacionProviderProps> = ({ children }) => {
    
    const loginClient = new LoginClient();
    const todaLaInfo = TodaLaInfoStore.useState(s=>s.todo);
    const [alerta] = useIonAlert();

    useEffect(()=>{
        const inicioExitoso = ()=>{
            TodaLaInfoStore.subscribe(
                s=>s.todo,
                (info)=> {
                    if(info){
                        localStorage.setItem('todaInfo',JSON.stringify(info))
                    }
                },
            )
        }
        return ()=>{
            inicioExitoso();
        }
    }, []);

    useEffect(()=>{
        const buscarInfoCache =  ()=>{
            const info = localStorage.getItem('todaInfo')
            if(info){
                TodaLaInfoStore.update(s=>{
                    s.todo = JSON.parse(info) as TodaLaInfo
                })
            } 
        }
        return ()=>{
            buscarInfoCache()
        }
    },[])


    const login = async (usuario: string, clave: string) => {
        console.log(usuario, clave);
        
        await loginClient.post({cedula:usuario, pass:clave}).then(value=>{
            
            if(value && value.info_cabecera){
                console.log(value);
                TodaLaInfoStore.update(s => {
                    s.todo = value;
                });
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
