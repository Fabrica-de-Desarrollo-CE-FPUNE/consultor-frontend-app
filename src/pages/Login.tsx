import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';


import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/fields';
import { useEffect, useState } from 'react';
import { getValues, validateForm } from '../data/utils';
import { ErrorMessage } from '../data/types';

const Login:React.FC = () => {
    

    const fields = useLoginFields();
    const [ errors, setErrors ] = useState<ErrorMessage[]>([]);

    const login = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {

            console.log(getValues(fields));
            
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.state.reset(''));
            
            setErrors([]);

        }
    }, []);

	return (
		<IonPage >
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

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

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map((field,index) => {

                                return <CustomField key={index} field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ login }>Login</IonButton>
                        </IonCol>
                    </IonRow>
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