import { Store } from "pullstate"

interface TokenStoreState {
    token:string|undefined|null
}


export const TokenStore = new Store<TokenStoreState>({
    token: localStorage.getItem('token')
});

export const vaciarTokenStore = ()=>{
    
    TokenStore.update(s=>{
        s.token=null;
    });

    localStorage.removeItem('token')
}
