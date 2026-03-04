import { Store } from "pullstate";
import { InfoEscala, InfoResultadoEvaluacionFinal } from "./types";
import { getEscalasApi } from "./fetchers/MateriasClient";

interface EscalaStoreState {
    escalas: InfoEscala[];
}


export const EscalaStore = new Store<EscalaStoreState>({
    escalas: []
});

export const setEscalaStore = (escalas: InfoEscala[]) => {
    EscalaStore.update(s => {
        s.escalas = escalas
    });
}

export const getEscalaStore = () => {
    return EscalaStore.useState(s => s.escalas);
}
const getEscalas = async () => {
    const response = await getEscalasApi();
    if (response) {
        setEscalaStore(response);
    }
}

getEscalas();