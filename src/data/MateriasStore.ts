import { Store } from "pullstate";
import { InfoMateriaAllDetalles, Materia } from "./types2";
import { getMateriasApi } from "./fetchers/MateriasClient";

interface InfoInscripcionesAsistenciaStoreState {
    info_inscripciones: InfoMateriaAllDetalles[]
}

interface MateriaStoreState {
    materias: Materia[]
}

export const MateriaStore = new Store<MateriaStoreState>({
    materias: []
});

export const setMateriaStore = (materias: Materia[]) => {
    MateriaStore.update(s => {
        s.materias = materias
    });
}



const getMaterias = async () => {
    const data = await getMateriasApi();
    if (data) {
        setMateriaStore(data);
    }
}

export const InfoInscripcionesAsistenciaStore = new Store<InfoInscripcionesAsistenciaStoreState>({
    info_inscripciones: []
});

export const setInfoInscripcionesAsistenciaStore = (info_inscripciones: InfoMateriaAllDetalles[]) => {
    InfoInscripcionesAsistenciaStore.update(s => {
        s.info_inscripciones = info_inscripciones
    });
};

getMaterias();