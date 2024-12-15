import { useState, useRef, useEffect } from "react";
import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import userAnimation from "../assets/animations/user.json";
import { useAuth } from "../pages/auth/authContext";

import * as Page from "../components/page";
import * as Tooltip from "../components/Tooltip";
import { authentication, checkZipCode } from "../api";

type FormValues = {
  name: string;
  first_last_name: string;
  second_last_name: string;
  colony: string;
  municipality: string;
  zip_code: string;
  state: string;
  address: string;
  curp: string;
  rfc: string;
  birthdate: string;
  identification_number: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
};

const CreateProfile: React.FC = () => {
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { setUserInfo } = useAuth()!;
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showTooltip &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef, showTooltip]);

  const onSubmit = async (data: FormValues) => {
    const response = await authentication.updateProfile(data);

    if (response.status === 200) {
      setUserInfo(
        "full_name",
        `${data.name} ${data.first_last_name} ${data.second_last_name}`
      );
      router.push(`/applications/lease-contract`);
    }
  };

  const handleBlurZipCode = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      try {
        const response = await checkZipCode(event.target.value);
        if (response.status === 200) {
          const data = await response.json();
          setValue("municipality", data.municipality);
          setValue("state", data.state);
          setValue("colony", data.place);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
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
                Tu información personal deberá registrarse del mismo modo en que
                aparece en tu identificación oficial
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
                <label htmlFor="first_last_name">Apellido Paterno</label>
                <input
                  type="text"
                  id="first_last_name"
                  className="min-w-full"
                  {...register("first_last_name", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="second_last_name">Apellido Materno</label>
                <input
                  type="text"
                  id="second_last_name"
                  className="min-w-full"
                  {...register("second_last_name", { required: true })}
                />
              </div>

              <div className="form-control relative">
                <label
                  htmlFor="identification_number"
                  className="!inline-flex items-center"
                >
                  INE / Pasaporte
                  <Tooltip.Trigger
                    aria-label="Más información"
                    value="identification-number-tooltip"
                  />
                </label>

                <Tooltip.Content value="identification-number-tooltip">
                  <p className="text-left text-sm font-normal">
                    <span className="font-medium">INE:</span> Número ubicado
                    después de 'IDMEX' en la parte posterior de la credencial.
                    Omite el último dígito.
                  </p>

                  <p className="text-left text-sm font-normal">
                    <span className="font-medium">Pasaporte:</span> "Ubicado en
                    la esquina superior derecha de la página de información
                    personal"
                  </p>
                </Tooltip.Content>

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
                <label htmlFor="rfc">
                  Registro Federal de Contribuyentes (con homoclave)
                </label>
                <input
                  type="text"
                  id="rfc"
                  placeholder="RFC"
                  className="min-w-full uppercase"
                  minLength={13}
                  maxLength={13}
                  {...register("rfc", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="curp">
                  Clave Única de Registro de Población
                </label>
                <input
                  type="text"
                  id="curp"
                  placeholder="CURP"
                  className="min-w-full uppercase"
                  minLength={18}
                  maxLength={18}
                  autoCapitalize="characters"
                  {...register("curp", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="address">
                  Calle, número exterior / interior
                </label>
                <input
                  type="text"
                  id="address"
                  className="min-w-full"
                  {...register("address", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="zip_code">Código postal</label>
                <input
                  type="text"
                  id="zip_code"
                  className="min-w-full"
                  {...register("zip_code", { required: true })}
                  onBlur={handleBlurZipCode}
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
                <label htmlFor="municipality">Alcaldía</label>
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
                  {...register("state", { required: true })}
                />
              </div>

              <div className="form-control">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  type="text"
                  id="linkedin"
                  className="min-w-full"
                  {...register("linkedin")}
                />
                <p className="help-text">Use la URL de su perfil de LinkedIn</p>
              </div>

              <div className="form-control">
                <label htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  id="instagram"
                  className="min-w-full"
                  {...register("instagram")}
                />
                <p className="help-text">
                  Use la URL de tu perfil de Instagram
                </p>
              </div>

              <div className="form-control">
                <label htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  id="facebook"
                  className="min-w-full"
                  {...register("facebook")}
                />
                <p className="help-text">Use la URL de tu perfil de Facebook</p>
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
