import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { API_SERVER_URL } from "../../config";

import FileInputItem from "../../components/FileInputItem";
import PhotoInputItem from "../../components/photo-input/PhotoInputItem";
import { properties } from "../../api";

const UploadPictures: React.FC = ({ match }) => {
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = async (body) => {
    const response = await properties.update({ id: match.params.id, body });
    const json = await response.json();

    if (response.status === 200) {
      router.push(`/property/${match.params.id}/confirmation-data`);
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
            <PhotoInputItem control={control} name="house_from">
              <h5 className="font-bold text-xs leading-3">Frente de la casa</h5>
              <p className="text-[10px]">Toma una foto del frente de tu casa</p>
            </PhotoInputItem>
            <PhotoInputItem control={control} name="electricity_meter">
              <h5 className="font-bold text-xs leading-3">Medidor de luz</h5>
              <p className="text-[10px]">Toma una foto del medidor de luz</p>
            </PhotoInputItem>
            <PhotoInputItem control={control} name="water_meter">
              <h5 className="font-bold text-xs leading-3">Toma de agua</h5>
              <p className="text-[10px]">
                Toma una foto de la toma de agua principal
              </p>
            </PhotoInputItem>
            <PhotoInputItem control={control} name="street">
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
        <div className="border-bottom border-primary-blue" />

        <div className="content">
          <form className="form py-20">
            <input type="text" placeholder="Tomar foto" />
          </form>
          <button
            className="button button-primary mb-4"
            onClick={() => router.push("")}
          >
            Tomar foto
          </button>
          <button
            className="button button-secondary mb-8"
            onClick={() => router.push("")}
          >
            Cancelar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
