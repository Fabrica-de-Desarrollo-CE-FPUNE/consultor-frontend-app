import { Store } from "pullstate";
import { Preferences } from '@capacitor/preferences';
import { AuthToken } from "./types";

interface TokenStoreState extends AuthToken {
}


const getToken = async () => {
    const tokenRawData = (await Preferences.get({ key: 'token' })).value ?? undefined;
    if(tokenRawData) {
        const token:AuthToken = {
            token: tokenRawData
        }
        setTokenStore(token);
    }
    
}

export const TokenStore = new Store<TokenStoreState>({
    token: ''
});

export const setTokenStore = (authToken: AuthToken) => {
    TokenStore.update(s => {
        s.token = authToken.token
    });
    Preferences.set({
        key:'token',
        value: authToken.token??""
    })
}

export const getTokenStore = () => {
    return TokenStore.useState(s => s.token);
}


export const vaciarTokenStore = () => {

    Preferences.remove({ key: 'token' });
    setTokenStore({token: ''});
}

getToken();