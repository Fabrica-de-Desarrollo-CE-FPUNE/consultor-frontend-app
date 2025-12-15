import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonModal } from '@ionic/react';
import './MateriaDetalle.css';
import { calculatorOutline, downloadOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { espaciosEntreNumeros, parseDate } from '../data/utils';
import Calculadora from '../components/Calculadora';
import { AppLauncher } from '@capacitor/app-launcher';
import { InfoMateriaPendiente, InfoResultadoEvaluacionFinal, InfoResultadoParcial } from '../data/types';
import { InfoMateriaAllDetalles } from '../data/types2';
import { getMateriaByIdApi } from '../data/fetchers/MateriasClient';

const MateriaDetalle: React.FC = () => {

  const history = useHistory();
  const { name } = useParams<{ name: string }>();
  const [alert] = useIonAlert();

  const [materia, setMateria] = useState<InfoMateriaAllDetalles>();

  const fetchMateriaDetalles = async (idMateria: number) => {
    console.log('Fetching details for materia ID:', idMateria);
    const materia = await getMateriaByIdApi(idMateria);
    setMateria(materia);
  };

  useEffect(() => {

    if (name) {
      fetchMateriaDetalles(Number(name));
    }

  }, [name]);
  const cerrar = () => {
    return cerrarCalculadora()
  }

  const [mostrarCalculadora, cerrarCalculadora] = useIonModal(Calculadora, {
    materia: `${materia?.materiaCarrera.materia.nombre}`,
    escala: materia?.escala,
    materiaParcial: materia?.resultadoParcial,
    cerrar
  });


 const noIncluir = [
    'materia', 'bonificacion', 'semestre', 'id'
  ]

  const abrirURL = async () => {
    await AppLauncher.openUrl({ url: `https://www.fpune.edu.py/web/docs/programas/.pdf` });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Atrás" defaultHref="/materias" />
          </IonButtons>
          <IonTitle>{materia?.materiaCarrera.materia.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonLabel className='ion-text-capitalize'>
                <h1>Información de {materia?.materiaCarrera.materia.nombre}</h1>
              </IonLabel>

            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {
                  materia && Object.keys(materia.periodo).map((parametro, index) => {
                    const valor = materia.periodo[parametro as keyof typeof materia.periodo].toString();
                    if (valor && !noIncluir.includes(parametro) && parametro !== 'nombre') {
                      return (
                        <IonCol key={index} sizeXs='6'>
                          <IonLabel color="dark"  className='ion-text-capitalize'>
                            <h3>{(parametro.replace(/_/g, ' '))}</h3>
                            <p>{parseDate(valor)}</p>
                          </IonLabel>
                        </IonCol>
                      );
                    }
                    return null
                  })
                }
                <IonCol sizeXs='6' size='auto'>
                  <IonLabel color="dark">
                    <h3>Semestre</h3>
                    <p>{materia?.materiaCarrera.semestre}</p>
                  </IonLabel>
                </IonCol>
                <IonCol sizeXs='6' size='auto'>
                  <IonLabel color="dark">
                    <h3>Grupo</h3>
                    <p>{materia?.grupo}</p>
                  </IonLabel>
                </IonCol>
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
                  materia && (
                    Object.keys(materia.resultadoParcial).map((parametro, index, array) => {
                      const titulo = (espaciosEntreNumeros({ texto: parametro, ignorarOtrosNumeros: false }).replace(/_/g, ' '))
                      const valor = materia.resultadoParcial[parametro]

                      if (!noIncluir.includes(parametro)){
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
          materia && materia.examenesFinales.length > 0 && (
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
                      materia.examenesFinales.map((materiaFinal, index) =>
                      (
                        <IonItem color="light" key={index} className={Number(materiaFinal.total) >= 60 ? 'animate__animated animate__headShake animate__repeat-3' : ''}>
                          <IonGrid>
                            <IonRow>
                              {
                                Object.keys(materiaFinal).map((parametro, index) => {

                                  const titulo = parseDate(espaciosEntreNumeros({ texto: parametro, ignorarOtrosNumeros: false }).replace(/_/g, ' '))
                                  const valor = materiaFinal[parametro]
                                  if (true) {
                                    return (
                                      <IonCol key={index}>
                                        <IonLabel color={Number(materiaFinal.total) >= 60 ? 'success' : 'danger'}>
                                          <h3>{titulo}</h3>
                                        </IonLabel>
                                        <IonLabel color="medium">
                                          <p>{valor}</p>
                                        </IonLabel>
                                      </IonCol>
                                    )
                                  }
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
        {/* {
          (materiaCalificaciones && materiaCalificaciones.length > 0 && !(materiaFinales && materiaFinales.length > 0)) && (
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
                      materiaCalificaciones.map((materiaCalificacion, index) =>
                      (
                        <IonItem color="light" key={index} className={materiaCalificacion.nota !== 'Uno' ? 'animate__animated animate__headShake animate__repeat-3' : ''}>
                          <IonGrid>
                            <IonRow>
                              {
                                Object.keys(materiaCalificacion).map((parametro, index) => {

                                  const titulo = primerasLetrasMayusculas(espaciosEntreNumeros({ texto: parametro, ignorarOtrosNumeros: false }).replace(/_/g, ' '))
                                  const valor = materiaCalificacion[parametro]
                                  if (true) {
                                    return (
                                      <IonCol key={index}>
                                        <IonLabel color={materiaCalificacion.nota !== 'Uno' ? 'success' : 'danger'}>
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
        } */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            color={materia /*&& isResultadoParcialCompleto(materiaDesemp, evaluacion.filter((n): n is number => n !== undefined)*/ ? 'success' : 'danger'}
            className={`ion-margin-bottom ${materia/* && isResultadoParcialCompleto(materiaDesemp, evaluacion.filter((n): n is number => n !== undefined))*/ ? 'animate__animated animate__bounce animate__delay-3s animate__repeat-3' : ''}`}
            onClick={() => mostrarCalculadora()}
          >
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
          <IonFabButton color='primary' onClick={() => {
            alert('¿Descargar programa de estudios de la materia?', [
              {
                text: 'Sí',
                handler: async () => {
                  await abrirURL()
                },
                cssClass: 'success',

              },
              {
                text: 'No',
                role: 'destructive'
              }
            ])
          }}>
            <IonIcon icon={downloadOutline} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default MateriaDetalle;
