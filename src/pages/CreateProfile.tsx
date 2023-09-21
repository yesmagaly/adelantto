import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import userAnimation from "../assets/animations/user.json";
import { ellipse } from "ionicons/icons";
import { API_SERVER_URL } from "../config";

type FormValues = {
  name: string | undefined;
  last_name: string | undefined;
};

const CreateProfile: React.FC = () => {
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = async (data: FormValues) => {
    const name = data.name;
    const last_name = data.last_name;
    // router.push("/advance-immediately")
    // router.push("/create-profile")

    const response = await fetch(`${API_SERVER_URL}/api/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, last_name }),
    });

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/advance-immediately`);
    }

    console.log(data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-9 py-6">
          <div className="heading__pager text-right">Paso 2 de 3</div>
        </div>

        <div className="content">
          <Lottie
            animationData={userAnimation}
            style={{ width: 250, height: 250 }}
            loop
            play
          />

          <div className="mb-10">
            <h1 className="font-bold text-3xl mb-2">Crea tu perfil</h1>
            <p className="text-sm leading-4">
              Tu nombre deberá registrarse del mismo modo en que aparece en tu
              identificación oficial
            </p>
          </div>

          <div className="px-9">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre (s)"
                  className="min-w-full"
                  {...register("name", { required: true })}
                />
                <input
                  type="text"
                  id="last_name"
                  placeholder="Apellido"
                  className="min-w-full"
                  {...register("last_name", { required: true })}
                />
              </div>

              <div className="mb-8">
                <button className="button button-primary">Guardar</button>
              </div>

              <div className="text-center">
                <button>
                  <IonIcon icon={ellipse}></IonIcon>
                </button>
                <button>
                  <IonIcon icon={ellipse}></IonIcon>
                </button>
                <button>
                  <IonIcon icon={ellipse}></IonIcon>
                </button>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
