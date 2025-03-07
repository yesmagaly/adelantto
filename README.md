AdelanttoCash - Aplicación IONIC

📌 Introducción

AdelanttoCash es una aplicación desarrollada con IONIC + React que permite la gestión y administración de adelantos en efectivo.
Este repositorio contiene el código fuente, instrucciones de instalación y configuración para su despliegue.

✅ Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

Node.js (Versión recomendada: LTS)

NPM o Yarn

Ionic CLI (Instalar con npm install -g @ionic/cli)

Capacitor (Si se compila para dispositivos)

Android Studio (Si se compila para Android)

Xcode (Si se compila para iOS)

🚀 Instalación

Clona este repositorio:

git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/ionic-app-adelantto
cd ionic-app-adelantto

Instala las dependencias:

npm install

Configura las variables de entorno (opcional, si aplica).

⚙️ Configuración

Si se requiere conexión a una API, configura el archivo .env con las variables necesarias.

Asegúrate de que los plugins y plataformas necesarias estén instaladas:

ionic cap sync

▶️ Ejecución del Proyecto

Para correr la aplicación en un navegador:

ionic serve

Para ejecutar en un dispositivo Android:

ionic capacitor run android

Para ejecutar en iOS:

ionic capacitor run ios

📂 Estructura del Proyecto

AdelanttoCash/
│── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Páginas principales
│   ├── services/        # Servicios y API calls
│   ├── assets/          # Recursos estáticos
│   ├── App.tsx          # Componente principal
│── public/              # Archivos públicos
│── capacitor.config.ts  # Configuración de Capacitor
│── package.json         # Dependencias del proyecto
│── ionic.config.json    # Configuración de Ionic

🛠 Comandos Útiles

Construir la aplicación:

ionic build

Añadir una plataforma:

ionic cap add android
ionic cap add ios

Abrir en el emulador:

ionic cap open android
ionic cap open ios

🤝 Contribución

Si deseas contribuir, crea un fork del repositorio, haz tus cambios y envía un pull request.

📜 Licencia

Este proyecto está bajo la licencia MIT.