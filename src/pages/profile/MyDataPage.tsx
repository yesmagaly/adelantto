import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";

import { useGetUserQuery } from "@adelantto/store";

import { MaterialIcon } from "@adelantto/core";

import { Link } from "react-router-dom";

export const MyDataPage: React.FC = () => {
  const router = useIonRouter();
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Mis datos
        </h1>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {user && (
          <div>
            <div className="flex flex-col gap-2">
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Nombres
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.name}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Apellidos
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.last_name}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Número de documento
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.document_number}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  RFC
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.rfc_number}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  CURP
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.curp_number}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Dirección
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.address}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Colonia
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.colony}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Municipio
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.municipality}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Estado
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.state}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Código postal
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.zip_code}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Correo electrónico
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.email}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Teléfono
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.phone}
                />
              </div>
              <div className="">
                <label htmlFor="" className="tetxt-sm font-medium">
                  Fecha de nacimiento
                </label>
                <input
                  className="input text-sm h-10"
                  type="text"
                  value={user.birthdate}
                />
              </div>
            </div>
            <IonFooter className="ion-padding">
              <button
                type="submit"
                form="form"
                className="btn-block btn btn-primary"
              >
                Actualizar datos
              </button>
            </IonFooter>
            {/* <dl>
              <dt className="float-left mr-1 mb-1">Nombre(s):</dt>
              <dd className="mb-1 font-bold">{user.name}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Apellidos:</dt>
              <dd className="mb-1 font-bold">{user.last_name}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Número de documento:</dt>
              <dd className="mb-1 font-bold">{user.document_number}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">RFC:</dt>
              <dd className="mb-1 font-bold">{user.rfc_number}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">CURP:</dt>
              <dd className="mb-1 font-bold">{user.curp_number}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Dirección:</dt>
              <dd className="mb-1 font-bold">{user.address}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Colonia:</dt>
              <dd className="mb-1 font-bold">{user.colony}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Municipio:</dt>
              <dd className="mb-1 font-bold">{user.municipality}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Estado:</dt>
              <dd className="mb-1 font-bold">{user.state}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Código postal:</dt>
              <dd className="mb-1 font-bold">{user.zip_code}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Correo electrónico:</dt>
              <dd className="mb-1 font-bold">{user.email}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Teléfono:</dt>
              <dd className="mb-1 font-bold">{user.phone}</dd>
            </dl>
            <dl>
              <dt className="float-left mr-1 mb-1">Fecha de nacimiento:</dt>
              <dd className="mb-1 font-bold">{user.birthdate}</dd>
            </dl> */}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
