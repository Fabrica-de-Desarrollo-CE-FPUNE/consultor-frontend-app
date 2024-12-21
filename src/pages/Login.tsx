import { IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';


import { shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/fields';
import { useEffect, useState } from 'react';
import { getValues, validateForm } from '../data/utils';
import { ErrorMessage } from '../data/types';
import { useAutenticacion } from '../contexts/AutenticacionContext';
import { useLoader } from '../contexts/LoadingContext';
import { cargaLocal, TodaLaInfoStore } from '../data/TodaLaInfoStore';

const Login:React.FC = () => {
    
    const {login} = useAutenticacion()
    const fields = useLoginFields();
    const [ errors, setErrors ] = useState<ErrorMessage[]>([]);
    const { setEstaCargando } = useLoader();

    const handleLogin = async () => {
        
        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {
            const valores = getValues(fields);
            setEstaCargando(true);
            login(valores.usuario, valores.clave).then(()=>{
                setEstaCargando(false)
            })
            
        }
    }

    const handleInfo = async () => {
        const resultadoLocal = await cargaLocal();
        setEstaCargando(true)
        setTimeout(()=>{
            setEstaCargando(false);
            
            if(resultadoLocal) {
                TodaLaInfoStore.update(s=>{
                    s.todo=resultadoLocal
                });
            } 
        },1500);
        
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.state.reset(''));
            
            setErrors([]);

            
        }
    }, []);

    useEffect(()=>{
        handleInfo();
    },[]);
    
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" >
                            <IonCardTitle>Login</IonCardTitle>
                            <h5>Bienvenido de vuelta</h5>
                        </IonCol>
                    </IonRow>
                    <form>
                        <IonRow className="ion-margin-top ion-padding-top">
                            <IonCol size="12">

                                { fields.map((field,index) => {

                                    return <CustomField key={index} field={ field } errors={ errors } />;
                                })}

                                <IonButton className="custom-button" expand="block" onClick={ handleLogin }>Login</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">
				</IonGrid>
			</IonFooter>
		</IonPage>
	);

};

export default Login;