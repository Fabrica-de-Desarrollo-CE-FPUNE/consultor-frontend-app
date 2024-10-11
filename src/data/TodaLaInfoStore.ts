import { Store } from 'pullstate';
import { TodaLaInfo } from './types';
import { Preferences } from '@capacitor/preferences';


interface TodaLaInfoStoreState {
    todo: TodaLaInfo|null|undefined
}

export const TodaLaInfoStore = new Store<TodaLaInfoStoreState>({
    todo:null
});

export const vaciarTodaLaInfo = async ()=>{
    TodaLaInfoStore.update(s=>{
        s.todo=null;
    });
    await Preferences.remove({key:'todaInfo'})
}

