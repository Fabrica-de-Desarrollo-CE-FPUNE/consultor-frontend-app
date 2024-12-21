import { Store } from 'pullstate';
import { TodaLaInfo } from './types';
import { Preferences } from '@capacitor/preferences';


interface TodaLaInfoStoreState {
    todo: TodaLaInfo|null
}

export const setInfo = async (info:TodaLaInfo) => {

    const value = JSON.stringify(info);

    //localStorage.setItem('todaInfo',value)

    await Preferences.set({
        key:'todaInfo',
        value: value
    });

}



export const TodaLaInfoStore = new Store<TodaLaInfoStoreState>({
    todo: null
});

export const vaciarTodaLaInfo = ()=>{
    TodaLaInfoStore.update(s=>{
        s.todo=null;
    });
    Preferences.remove({key:'todaInfo'})
    localStorage.removeItem('todaInfo');
}

export const cargaLocal = async ()=>{
    const resultado = (await Preferences.get({key:'todaInfo'})).value;
    return resultado?JSON.parse(resultado):null;
}
