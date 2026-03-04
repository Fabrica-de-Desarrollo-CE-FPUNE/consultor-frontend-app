import { Store } from "pullstate";

interface ConfigStoreState {
    isLoading: boolean;
}

export const ConfigStore = new Store<ConfigStoreState>({
    isLoading: true
});

export const setConfigLoading = (isLoading: boolean) => {
    ConfigStore.update(s => {
        s.isLoading = isLoading
    });
}
