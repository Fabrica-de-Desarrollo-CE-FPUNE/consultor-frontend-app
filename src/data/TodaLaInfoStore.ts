import { Store } from 'pullstate';
import { TodaLaInfo } from './types';


interface TodaLaInfoStoreState {
    todo: TodaLaInfo|null|undefined
}

export const TodaLaInfoStore = new Store<TodaLaInfoStoreState>({
    todo: null
});

export const vaciarTodaLaInfo = async ()=>{
    TodaLaInfoStore.update(s=>{
        s.todo=null;
    });
    localStorage.remove('todaInfo')
}

