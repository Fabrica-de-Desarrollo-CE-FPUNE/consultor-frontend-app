import { Store } from "pullstate";
import { Preferences } from '@capacitor/preferences';

interface TokenStoreState {
    token:string|null
}

const token = (await Preferences.get({ key: 'token' })).value


export const TokenStore = new Store<TokenStoreState>({
    token
});

export const vaciarTokenStore = ()=>{
    
    TokenStore.update(s=>{
        s.token=null;
    });

    Preferences.remove({key:'token'});
}
