import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import PhotoInputItem from "../../components/photo-input/PhotoInputItem";
import { applications } from "../../api";

const UploadPictures: React.FC = ({ match }) => {
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await applications.propertyPictures(match.params.id, {
      ...data,
      step: 'property_pictures'
    });

    const json = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/privacy-policy`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 3 de 3</div>
          <h4 className="text-xl">
            A continuación <strong>sube algunas fotografías</strong> para validar tu propiedad
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 mb-40">
            <PhotoInputItem control={control} name="property_house_from" rules={{ required: "Imagen obligatoria" }}>
              <label className="font-bold text-sm leading-3 is-required">Frente de la casa</label>

              <p className="text-sm">Toma una foto del frente de tu casa</p>
              {errors?.house_from && (
                <span className="message is-small is-danger">
                  {errors?.house_from?.message}
                </span>
              )}
            </PhotoInputItem>
            <PhotoInputItem control={control} name="property_electricity_meter">
              <h5 className="font-bold text-xs leading-3">Medidor de luz</h5>
              <p className="text-[10px]">Toma una foto del medidor de luz</p>
            </PhotoInputItem>
            <PhotoInputItem control={control} name="property_water_meter">
              <h5 className="font-bold text-xs leading-3">Toma de agua</h5>
              <p className="text-[10px]">
                Toma una foto de la toma de agua principal
              </p>
            </PhotoInputItem>
            <PhotoInputItem control={control} name="property_street">
              <h5 className="font-bold text-xs leading-3">Calle</h5>
              <p className="text-[10px]">
                Toma una foto de la vista de la calle
              </p>
            </PhotoInputItem>
          </div>

          <div className="text-center mb-7">
            <p className="font-semibold text-[10px] leading-3 mb-4">
              Los documentos deberán ser escaneados en alta resolución <br /> y
              en formato PDF, de lo contrario declinaremos el proceso.
            </p>
            <button className="button is-primary">Siguiente</button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
