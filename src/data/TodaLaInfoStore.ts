import { Store } from 'pullstate';
import { TodaLaInfo } from './types';
import { Preferences } from '@capacitor/preferences';


interface TodaLaInfoStoreState {
    todo: TodaLaInfo|null|undefined
}

const retornarInfo = async ()=>{

    const get = await Preferences.get({key:'todaInfo'}).then((data)=>{
        if(data && data.value){
            return data.value as unknown as TodaLaInfo
        }
        return null;
    }).catch((err)=>{
        console.log(err);
        return null;
    });

    const resultado:TodaLaInfoStoreState = {
        todo: get
    }

    return resultado
}


export const TodaLaInfoStore = new Store<TodaLaInfoStoreState>(await retornarInfo());

export const vaciarTodaLaInfo = async ()=>{
    TodaLaInfoStore.update(s=>{
        s.todo=null;
    });
    await Preferences.remove({key:'todaInfo'})
}

