import React, { useEffect } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonModal } from '@ionic/react';
import './MateriaDetalle.css';
import { calculatorOutline, downloadOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';
import { espaciosEntreNumeros, isResultadoParcialCompleto, primerasLetrasMayusculas, transformarEvaluacion } from '../data/utils';
import Calculadora from '../components/Calculadora';
import { AppLauncher } from '@capacitor/app-launcher';

const MateriaDetalle: React.FC = () => {

  const history = useHistory();
  const {name} = useParams<{name:string}>();
  const [alert] = useIonAlert();

  const materiaInscripcion = TodaLaInfoStore.useState(s=> s.todo?.info_inscripciones
    .filter(materiaDetalle=>materiaDetalle.materia.toLowerCase().includes(name.toLowerCase()))[0]
  );
  
  const materiaDesemp = TodaLaInfoStore.useState(s=>s.todo?.info_parciales.filter(materiaDetalle=>
    materiaDetalle.materia.toLowerCase().includes(name.toLowerCase()))[0]);

  const materiaFinales = TodaLaInfoStore.useState(s=>s.todo?.info_finales.filter(materiaFinal=>
    materiaFinal.materia.toLowerCase().includes(name.toLowerCase()) && materiaFinal.final.length
  )) || [];

  const materiaCalificaciones = TodaLaInfoStore.useState(s=>s.todo?.info_calificaciones.filter((materiaCalificacion=>
    materiaCalificacion.materia.toLowerCase().includes(name.toLowerCase())
  )));

  const evaluacion = transformarEvaluacion(materiaDesemp?.evaluacion||"").map((v,i,a)=>{
    if(i!==a.length-1) return v;
  }).filter(v=>v!==undefined);

  const cerrar = ()=>{
    return cerrarCalculadora()
  }

  const [mostrarCalculadora, cerrarCalculadora] = useIonModal(Calculadora, {
    materia: `Bonificación de ${name}`,
    infoParcial: {...materiaDesemp},
    cerrar
  });


  useEffect(()=>{
    if(!materiaDesemp) {
      history.goBack();
    }
  },[materiaDesemp])

  
  const noIncluir = [
    'materia', 'bonificacion', 'semestre'
  ]

  
  const abrirURL = async () => {
    await AppLauncher.openUrl({ url: `https://www.fpune.edu.py/web/docs/programas/${materiaDesemp?.materia.substring(0,4)}.pdf`});
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Atrás" defaultHref="/materias"/>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonLabel>
                <h1>Información de {name}</h1>
              </IonLabel>
              
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
              {
                materiaInscripcion && Object.keys(materiaInscripcion).map((parametro, index)=>{
                  const valor = materiaInscripcion[parametro];
                  if(valor && !noIncluir.includes(parametro)){
                    return(
                      <IonCol  key={index} sizeXs='6'>
                        <IonLabel color="dark">
                          <h3>{primerasLetrasMayusculas(parametro.replace(/_/g,' '))}</h3>
                          <p>{valor}</p>
                        </IonLabel>
                      </IonCol>
                    );
                  }
                  return null
                })
              }
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
            <IonLabel>
                <h1>Desempeño</h1>
              </IonLabel>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {
                  materiaDesemp && (
                    Object.keys(materiaDesemp).map((parametro, index, array)=>{
                      
                      const titulo = primerasLetrasMayusculas(espaciosEntreNumeros({texto: parametro, ignorarOtrosNumeros:false}).replace(/_/g,' '))
                      const valor = materiaDesemp[parametro]
                      
                      if(!noIncluir.includes(parametro) && evaluacion.length && evaluacion[index-1]>0  || array.length-1===index ){
                        return (
                          <IonCol key={index} sizeXs='6' size='auto'>
                            <IonLabel color="dark">
                              <h3>{titulo}</h3>
                              <p>{valor}</p>
                            </IonLabel>
                          </IonCol>
                        )
                      }
                      return null
                    })
                    
                  )
                }
                
              </IonRow>

            </IonGrid>
          </IonCardContent>
        </IonCard>
        {
           materiaFinales && materiaFinales.length>0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                <IonLabel>
                    <h1>Resultado de las Finales</h1>
                  </IonLabel>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItemGroup>
                    {
                      materiaFinales.map((materiaFinal, index)=>
                        (
                          <IonItem color="light" key={index} className={Number(materiaFinal.total)>=60?'animate__animated animate__headShake animate__repeat-3':''}>
                            <IonGrid>
                              <IonRow>
                              {
                              Object.keys(materiaFinal).map((parametro, index)=>{
                      
                                const titulo = primerasLetrasMayusculas(espaciosEntreNumeros({texto: parametro, ignorarOtrosNumeros:false}).replace(/_/g,' '))
                                const valor = materiaFinal[parametro]
                                if(!noIncluir.includes(parametro)){
                                  return (
                                      <IonCol key={index}>
                                        <IonLabel color={Number(materiaFinal.total)>=60?'success':'danger'}>
                                          <h3>{titulo}</h3>
                                        </IonLabel>
                                        <IonLabel color="medium">
                                          <p>{valor}</p>
                                        </IonLabel>
                                      </IonCol>
                                  )
                                }
                                return null
                              })
                            }
                              </IonRow>
                            </IonGrid>
                          </IonItem>
                        )
                      )            
                    }
                  </IonItemGroup>
                </IonList>
              </IonCardContent>
            </IonCard>
          )
        }
        {
          (materiaCalificaciones && materiaCalificaciones.length>0 && !(materiaFinales && materiaFinales.length>0)) && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                <IonLabel>
                    <h1>Calificaciones Finales</h1>
                  </IonLabel>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItemGroup>
                    {
                      materiaCalificaciones.map((materiaCalificacion, index)=>
                        (
                          <IonItem color="light" key={index} className={materiaCalificacion.nota!=='Uno'?'animate__animated animate__headShake animate__repeat-3':''}>
                            <IonGrid>
                              <IonRow>
                              {
                              Object.keys(materiaCalificacion).map((parametro, index)=>{
                      
                                const titulo = primerasLetrasMayusculas(espaciosEntreNumeros({texto: parametro, ignorarOtrosNumeros:false}).replace(/_/g,' '))
                                const valor = materiaCalificacion[parametro]
                                if(!noIncluir.includes(parametro)){
                                  return (
                                      <IonCol key={index}>
                                        <IonLabel color={materiaCalificacion.nota!=='Uno'?'success':'danger'}>
                                          <h3>{titulo}</h3>
                                        </IonLabel>
                                        <IonLabel color="medium">
                                          <p>{valor}</p>
                                        </IonLabel>
                                      </IonCol>
                                  )
                                }
                                return null
                              })
                            }
                              </IonRow>
                            </IonGrid>
                          </IonItem>
                        )
                      )            
                    }
                  </IonItemGroup>
                </IonList>
              </IonCardContent>
            </IonCard>
          )
        }
        {
          !materiaCalificaciones?.length && !materiaFinales.length && (
            <IonItem>
              <IonLabel>Aún no hay información sobre tus calificaciones finales en esta materia.</IonLabel>
            </IonItem>
          )
        }
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton 
          color={materiaDesemp && isResultadoParcialCompleto(materiaDesemp,evaluacion)?'success':'danger'} 
          className={`ion-margin-bottom ${materiaDesemp && isResultadoParcialCompleto(materiaDesemp, evaluacion)?'animate__animated animate__bounce animate__delay-3s animate__repeat-3':''}`}
          onClick={()=>mostrarCalculadora()}>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
          <IonFabButton color='primary' onClick={()=>{
            alert('¿Descargar programa de estudios de la materia?',[
              {
                text:'Sí',
                handler: async ()=>{
                  await abrirURL()
                },
                cssClass:'success',
                
              },
              {
                text:'No',
                role:'destructive'
              }
            ])
          }}>
            <IonIcon icon={downloadOutline}/>
          </IonFabButton>
        </IonFab>
       
      </IonContent>
    </IonPage>
  );
};

export default MateriaDetalle;
