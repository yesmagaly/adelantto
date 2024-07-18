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
  colony: string;
};

const CreateProfile: React.FC = () => {
  const { setUserInfo } = useAuth()!;
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm();

  const onSubmit = async (data: FormValues) => {

    console.log(data);

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
              style={{ width: 280, height: 280, margin: "0 auto" }}
              loop
              play
            />

            <div className="mb-8">
              <h1 className="heading-3 mb-4 text-center">
                <strong>Crea tu perfil</strong>
              </h1>
              <p className="headline text-balance text-center">
                Tu información personal deberá registrarse del mismo modo en que aparece en tu identificación oficial
              </p>
            </div>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label htmlFor="name">Nombre (s)</label>
                <input
                  type="text"
                  id="name"
                  className="min-w-full"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label htmlFor="last_name">Apellidos</label>
                <input
                  type="text"
                  id="last_name"
                  className="min-w-full"
                  {...register("last_name", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="identification_number">Número de identificación</label>
                <input
                  type="text"
                  id="identification_number"
                  className="min-w-full"
                  {...register("identification_number", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="birthdate">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="birthdate"
                  className="min-w-full"
                  {...register("birthdate", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="rfc">Registro Federal de Contribuyentes</label>
                <input
                  type="text"
                  id="rfc"
                  placeholder="RFC"
                  className="min-w-full"
                  {...register("rfc", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="curp">Clave Única de Registro de Población</label>
                <input
                  type="text"
                  id="curp"
                  placeholder="CURP"
                  className="min-w-full"
                  {...register("curp", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="address">Calle, número interior / número exterior</label>
                <input
                  type="text"
                  id="address"
                  className="min-w-full"
                  {...register("address", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="colony">Colonia</label>
                <input
                  type="text"
                  id="colony"
                  className="min-w-full"
                  {...register("colony", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="municipality">Municipio</label>
                <input
                  type="text"
                  id="municipality"
                  className="min-w-full"
                  {...register("municipality", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  id="state"
                  className="min-w-full"
                  value='Ciudad de México'
                  {...register("state", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="zip_code">Código postal</label>
                <input
                  type="text"
                  id="zip_code"
                  className="min-w-full"
                  {...register("zip_code", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="ine">INE</label>
                <input
                  type="text"
                  id="ine"
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
