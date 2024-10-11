import React, { ReactNode, useEffect } from 'react';
import { AutenticacionContext } from './AutenticacionContext';
import { LoginClient } from '../data/fetchers/LoginClient';
import { TodaLaInfoStore, vaciarTodaLaInfo } from '../data/TodaLaInfoStore';
import { Preferences } from '@capacitor/preferences';



interface AutenticacionProviderProps {
  children: ReactNode;
}

export const AutenticacionProvider: React.FC<AutenticacionProviderProps> = ({ children }) => {
    
    const loginClient = new LoginClient();
    const todaLaInfo = TodaLaInfoStore.useState(s=>s.todo);

    useEffect(()=>{
        const inicioExitoso = ()=>{
            TodaLaInfoStore.subscribe(
                (s)=>s.todo,
                (infoNueva)=> {
                    if(infoNueva){
                        Preferences.set({key:'todaInfo', value:JSON.stringify(infoNueva)})
                    }
                }
            )
        }
        return ()=>{
            inicioExitoso();
        }
    }, []);


    const login = async (usuario: string, clave: string) => {
        console.log(usuario, clave);
        
        await loginClient.post({cedula:usuario, pass:clave}).then(value=>{

            console.log(value);
            TodaLaInfoStore.update(s => {
                s.todo = value;
            });
            

        }).catch(err=>{
            console.error(err);
            
        })
    };

    const logout = async () => {
        await vaciarTodaLaInfo();
    };

    return (
        <AutenticacionContext.Provider value={{ todaLaInfo, login, logout }}>
        {children}
        </AutenticacionContext.Provider>
    );
};
