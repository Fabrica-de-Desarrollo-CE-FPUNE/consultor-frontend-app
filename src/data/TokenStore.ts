import { Preferences } from "@capacitor/preferences";
import { Store } from "pullstate"

interface TokenStoreState {
    token:string|undefined|null
}

export const TokenStore = new Store<TokenStoreState>({
    token:(await Preferences.get({ key: 'token' })).value
});

export const vaciarTokenStore = async ()=>{
    
    TokenStore.update(s=>{
        s.token=null;
    });

    await Preferences.remove({key:'token'});
}
