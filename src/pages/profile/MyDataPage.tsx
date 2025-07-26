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
import { AppNav } from "../../layout/AppNav";

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
            <dl>
              {user.name && (
                <>
                  <dt className="font-semibold text-sm">Nombre(s):</dt>
                  <dd className="mb-2 text-sm">{user.name}</dd>
                </>
              )}

              {user.last_name && (
                <>
                  <dt className="font-semibold text-sm">Apellidos:</dt>
                  <dd className="mb-2 text-sm">{user.last_name}</dd>
                </>
              )}

              {user.document_number && (
                <>
                  <dt className="font-semibold text-sm">
                    Número de documento:
                  </dt>
                  <dd className="mb-2 text-sm">{user.document_number}</dd>
                </>
              )}

              {user.rfc_number && (
                <>
                  <dt className="font-semibold text-sm">RFC:</dt>
                  <dd className="mb-2 text-sm">{user.rfc_number}</dd>
                </>
              )}

              {user.curp_number && (
                <>
                  <dt className="font-semibold text-sm">CURP:</dt>
                  <dd className="mb-2 text-sm">{user.curp_number}</dd>
                </>
              )}

              {user.address && (
                <>
                  <dt className="font-semibold text-sm">Dirección:</dt>
                  <dd className="mb-2 text-sm">{user.address}</dd>
                </>
              )}

              {user.colony && (
                <>
                  <dt className="font-semibold text-sm">Colonia:</dt>
                  <dd className="mb-2 text-sm">{user.colony}</dd>
                </>
              )}

              {user.municipality && (
                <>
                  <dt className="font-semibold text-sm">Municipio:</dt>
                  <dd className="mb-2 text-sm">{user.municipality}</dd>
                </>
              )}

              {user.state && (
                <>
                  <dt className="font-semibold text-sm">Estado:</dt>
                  <dd className="mb-2 text-sm">{user.state}</dd>
                </>
              )}

              {user.zip_code && (
                <>
                  <dt className="font-semibold text-sm">Código postal:</dt>
                  <dd className="mb-2 text-sm">{user.zip_code}</dd>
                </>
              )}

              {user.email && (
                <>
                  <dt className="font-semibold text-sm">Correo electrónico:</dt>
                  <dd className="mb-2 text-sm">{user.email}</dd>
                </>
              )}

              {user.phone && (
                <>
                  <dt className="font-semibold text-sm">Teléfono:</dt>
                  <dd className="mb-2 text-sm">{user.phone}</dd>
                </>
              )}

              {user.birthdate && (
                <>
                  <dt className="font-semibold text-sm">
                    Fecha de nacimiento:
                  </dt>
                  <dd className="mb-2 text-sm">{user.birthdate}</dd>
                </>
              )}
            </dl>
          </div>
        )}
      </IonContent>
      <IonFooter>
        <AppNav />
      </IonFooter>
    </IonPage>
  );
};
