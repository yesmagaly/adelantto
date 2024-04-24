import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import userAnimation from "../assets/animations/user.json";
import { useAuth } from "../pages/auth/authContext";

import * as Page from "../components/page";
import { authentication } from "../api";

type FormValues = {
  name: string;
  last_name: string;
};

const CreateProfile: React.FC = () => {
  const { setUserInfo } = useAuth()!;
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = async (data: FormValues) => {
    const response = await authentication.updateProfile(data);

    if (response.status === 200) {
      setUserInfo('full_name', `${data.name} ${data.last_name}`);
      router.push(`/applications/lease-contract`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
            <div className="heading__pager text-right">1 de 3</div>

            <Lottie
              animationData={userAnimation}
              style={{ width: 280, height: 280 }}
              loop
              play
            />

            <div className="mb-8 text-center">
              <h1 className="heading-3 mb-4">
                <strong>Crea tu perfil</strong>
              </h1>
              <p className="headline">
                Tu nombre deberá registrarse del mismo modo en que aparece en tu
                identificación oficial
              </p>
            </div>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre (s)"
                  className="min-w-full"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  id="last_name"
                  placeholder="Apellidos"
                  className="min-w-full"
                  {...register("last_name", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="identification_number"
                  placeholder="Número de identificación"
                  className="min-w-full"
                  {...register("identification_number", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="rfc"
                  placeholder="RFC (Registro Federal de Contribuyentes)"
                  className="min-w-full"
                  {...register("rfc", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="curp"
                  placeholder="CURP (Clave Única de Registro de Población)"
                  className="min-w-full"
                  {...register("curp", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="address"
                  placeholder="Domicilio"
                  className="min-w-full"
                  {...register("address", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="colony"
                  placeholder="Colonia"
                  className="min-w-full"
                  {...register("colony", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="municipality"
                  placeholder="Municipio"
                  className="min-w-full"
                  {...register("municipality", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="state"
                  placeholder="Estado"
                  className="min-w-full"
                  value='Ciudad de México'
                  {...register("state", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="zip_code"
                  placeholder="Código postal"
                  className="min-w-full"
                  {...register("zip_code", { required: true })}
                />
              </div>

              <div className="form-control">
                <input
                  type="text"
                  id="ine"
                  placeholder="INE"
                  className="min-w-full"
                  {...register("ine", { required: true })}
                />
              </div>

              <div className="form-actions text-center">
                <button className="button is-primary">Guardar</button>
              </div>
            </form>
          </Page.Body>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
