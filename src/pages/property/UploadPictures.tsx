import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import FileInputItem from "../../components/FileInputItem";

import PhotoInputItem from "../../components/photo-input/PhotoInputItem";
import ErrorMessage from "../../components/ErrorMessage";
import { applications } from "../../api";

interface ComponentProps
  extends RouteComponentProps<{
    id: string;
  }> {}

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
      step: "property_pictures",
    });

    const json = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/final-announcement`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 7 de 7</div>
          <h4 className="text-2xl">
            A continuación <strong>sube algunas fotografías</strong> para
            validar tu propiedad
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5">
            <div className="form-control">
              <label>Comprobante de domicilio</label>
              <p className="form-help-text">
                No mayor a 3 meses. Solo agua, luz o telefonía fija
              </p>
              <FileInputItem
                control={control}
                name="property_proof_address"
                rules={{ required: "Imagen obligatoria" }}
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/avif"
              />
              {errors.property_proof_address && (
                <ErrorMessage error={errors.property_proof_address} />
              )}
            </div>

            <div className="form-control">
              <label className="is-required">Frente de la casa</label>
              <p className="form-help-text">
                Toma una foto del frente de tu casa
              </p>
              <FileInputItem
                control={control}
                name="property_house_front"
                rules={{ required: "Imagen obligatoria" }}
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/avif"
              />
              {errors.property_house_front && (
                <ErrorMessage error={errors.property_house_front} />
              )}
            </div>

            <div className="form-control">
              <label className="is-required">Calle</label>
              <p className="form-help-text">
                Toma una foto de la vista de tu calle
              </p>
              <FileInputItem
                control={control}
                name="property_street"
                rules={{ required: "Imagen obligatoria" }}
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/avif"
              />
              {errors.property_street && (
                <ErrorMessage error={errors.property_street} />
              )}
            </div>
          </div>

          <div className="mb-4 text-center">
            <p className="mb-4 text-balance text-sm font-medium leading-tight">
              Las fotografías deberán ser tomadas en alta resolución, de lo
              contrario declinaremos el proceso.
            </p>
            <button className="button is-primary">Siguiente</button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
