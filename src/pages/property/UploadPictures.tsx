import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RouteComponentProps } from "react-router";

import PhotoInputItem from "../../components/photo-input/PhotoInputItem";
import ErrorMessage from "../../components/ErrorMessage";
import { applications } from "../../api";

interface ComponentProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const UploadPictures: React.FC<ComponentProps> = ({ match }) => {
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = await applications.propertyPictures(match.params.id, {
      ...data,
      step: 'property_pictures'
    });

    const json = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/final-announcement`);
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 7 de 7</div>
          <h4 className="text-2xl">
            A continuación <strong>sube algunas fotografías</strong> para validar tu propiedad
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 mb-40">
            <PhotoInputItem control={control} name="property_house_front" rules={{ required: "Imagen obligatoria" }}>
              <label className="font-bold leading-4 is-required">Frente de la casa</label>
              <p className="text-sm">Toma una foto del frente de tu casa</p>
              {errors.property_house_front && (
                <ErrorMessage error={errors.property_house_front} />
              )}
            </PhotoInputItem>

            <PhotoInputItem control={control} name="property_electricity_meter" rules={{ required: "Imagen obligatoria" }}>
              <h5 className="font-bold leading-4">Medidor de luz</h5>
              <p className="text-sm">Toma una foto del medidor de luz</p>
              {errors.property_electricity_meter && (
                <ErrorMessage error={errors.property_electricity_meter} />
              )}
            </PhotoInputItem>

            <PhotoInputItem control={control} name="property_water_meter" rules={{ required: "Imagen obligatoria" }}>
              <h5 className="font-bold leading-4">Toma de agua</h5>
              <p className="text-sm">
                Toma una foto de la toma de agua principal
              </p>
              {errors.property_water_meter && (
                <ErrorMessage error={errors.property_water_meter} />
              )}
            </PhotoInputItem>

            <PhotoInputItem control={control} name="property_street" rules={{ required: "Imagen obligatoria" }}>
              <h5 className="font-bold leading-4">Calle</h5>
              <p className="text-sm">
                Toma una foto de la vista de la calle
              </p>
              {errors.property_street && (
                <ErrorMessage error={errors.property_street} />
              )}
            </PhotoInputItem>
          </div>

          <div className="text-center mb-4">
            <p className="font-medium text-sm leading-none text-balance mb-4 w-[80%] mx-auto">
              Las fotografías deberán ser tomadas en alta resolución,
              de lo contrario declinaremos el proceso.
            </p>
            <button className="button is-primary">Siguiente</button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
