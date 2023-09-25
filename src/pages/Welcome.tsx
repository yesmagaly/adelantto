import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { useEffect, useState } from "react";

const Welcome: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState();
  const router = useIonRouter();

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const fileName = new Date().getTime() + '.jpeg';

    setPhotoUrl(photo?.webPath);

    // const savedFileImage = await savePicture(photo, fileName);
    // const newPhotos = [savedFileImage, ...photos];
    // setPhotos(newPhotos);
    // Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        Welcome!

        <div className="flex gap-2">
          <button className="button" onClick={() => router.push("/property/upload-documents")}>
            Iniciar
          </button>

          <button onClick={() => takePhoto()} className="button button-secondary">
            Continuar
          </button>

        </div>

        {photoUrl && <img src={photoUrl}></img>}
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
