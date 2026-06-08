# EcoRenca - Sistema de Puntos por Reciclaje 🌿♻️

EcoRenca es una aplicación web progresiva (PWA) optimizada para dispositivos móviles (Mobile-First) diseñada para fomentar y premiar las prácticas ecológicas de reciclaje en la comuna de Renca, Santiago de Chile. Los usuarios pueden localizar contenedores de residuos estratégicos en un mapa interactivo, simular el escaneo de códigos QR en dichos contenedores para acumular puntos, y canjear sus puntos por recompensas en comercios locales y recargas de transporte público.

---

## 🚀 Tecnologías Principales

- **Framework Móvil**: [Ionic Framework v8](https://ionicframework.com/)
- **Frontend Core**: [Angular v20](https://angular.dev/) (Componentes Standalone)
- **Navegación Móvil**: Layout por Pestañas (Tabs) nativo de Ionic.
- **Mapas**: [Google Maps API](https://developers.google.com/maps) mediante la librería oficial `@angular/google-maps`.
- **Estilos**: Vanilla SCSS con arquitectura de diseño premium (Glassmorphism, gradientes ecológicos vibrantes y micro-animaciones).
- **Ejecución Local & Mobile**: [Node.js](https://nodejs.org/) v24.11 + npm v11.6 + Capacitor v8 para compilación nativa en Android e iOS.

---

## 🛠️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/                  # Estado Global, Modelos y Servicios
│   │   ├── services/
│   │   │   ├── points.service.ts   # Gestiona perfil, puntos, nivel e historial de reciclajes
│   │   │   └── bins.service.ts     # Gestiona contenedores en Renca y sus capacidades
│   │   └── models/
│   │       ├── user.model.ts       # Modelos del perfil de usuario y actividades
│   │       ├── bin.model.ts        # Modelos para geolocalización de contenedores
│   │       └── reward.model.ts     # Modelos para cupones y catálogo de la tienda
│   ├── shared/                # Componentes Compartidos
│   │   └── components/
│   │       └── qr-simulator/  # Modal que simula el visor de cámara para escanear QR
│   ├── tabs/                  # Layout de pestañas de navegación (Inicio, Mapa, Tienda)
│   ├── tab1/                  # Inicio (Perfil, puntos acumulados, barra de progreso y actividades)
│   ├── tab2/                  # Mapa (Google Maps interactivo, filtros y paneles de detalle)
│   ├── tab3/                  # EcoTienda (Catálogo de premios, canjes activos y cupones generados)
│   └── theme/                 # Paleta de variables de color de Sass
└── environments/              # Variables de Entorno (Ignoradas en Git por seguridad)
```

---

## 🔒 Configuración de Seguridad para GitHub (Google Maps API Key)

Para poder subir este proyecto a un repositorio público en GitHub sin exponer tu API Key de Google Maps a terceros (lo cual podría generar cobros no deseados o suspensión del servicio), hemos implementado la siguiente arquitectura de seguridad:

1. **Variables de Entorno**: Las claves se guardan en los archivos `src/environments/environment.ts` y `environment.prod.ts`.
2. **Git Ignore**: El archivo `.gitignore` está configurado para excluir los archivos reales de configuración:
   ```gitignore
   /src/environments/environment.ts
   /src/environments/environment.prod.ts
   !/src/environments/environment.example.ts
   ```
3. **Plantilla de Ejemplo**: Se incluye `src/environments/environment.example.ts` en el repositorio para servir como guía de estructura.

### ⚙️ Cómo configurar tu API Key localmente tras clonar el repositorio:

1. Duplica el archivo `environment.example.ts` y cámbiale el nombre a `environment.ts` (y opcionalmente a `environment.prod.ts` para producción) dentro de la carpeta `src/environments/`:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```
2. Abre el nuevo archivo `src/environments/environment.ts` y sustituye `'TU_API_KEY_DE_GOOGLE_MAPS_AQUI'` por tu clave real generada en la [Consola de Google Cloud](https://console.cloud.google.com/).
   ```typescript
   export const environment = {
     production: false,
     googleMapsApiKey: 'AIzaSyA1234567890...' // Tu clave real de Google Maps
   };
   ```
3. Guarda el archivo. Angular cargará automáticamente esta clave a nivel de runtime para renderizar el mapa interactivo de Renca. Si dejas el campo vacío, el mapa cargará de todas formas en modo de desarrollo con marcas de agua para permitir pruebas rápidas.

---

## 💻 Instalación y Ejecución Local

Para levantar el servidor de desarrollo en tu máquina local:

### 1. Prerrequisitos
Asegúrate de contar con Node.js y npm instalados en tu sistema. Se recomienda:
- **Node.js**: v20 o superior (el proyecto fue creado usando v24.11.1).
- **npm**: v10 o superior.

### 2. Instalar dependencias
Desde la raíz del proyecto, ejecuta el instalador de paquetes:
```bash
npm install
```

### 3. Levantar Servidor de Desarrollo
Puedes utilizar el CLI de Ionic o el script de Angular para arrancar el servidor en tiempo real:
```bash
# Opción 1: Usando Ionic CLI (Recomendado)
npx ionic serve

# Opción 2: Usando Angular CLI
npm run start
```
El servidor levantará en `http://localhost:8100/`.

### 4. Visualización Móvil (Recomendada)
Para experimentar el diseño **Mobile-First** con total comodidad:
1. Abre `http://localhost:8100/` en tu navegador (Chrome/Edge/Safari).
2. Presiona `F12` (o clic derecho -> *Inspeccionar*).
3. Activa el modo de simulación de dispositivo móvil (icono de tablet/celular en la esquina superior izquierda de las herramientas de desarrollo).
4. Elige un modelo como **iPhone SE**, **iPhone 12/13** o **Pixel 7** para visualizar la cómoda interfaz de la app.

---

## 🎨 Características de Diseño Premium y Flujo de la App

1. **Dashboard (Inicio)**: Diseñado en verde esmeralda y menta viva ecológicos. Muestra el puntaje acumulado sobre una tarjeta con efecto de vidrio esmerilado (glassmorphism), y una barra de progreso que indica cuántos puntos faltan para ascender de nivel.
2. **Mapa de Contenedores**: Mapa interactivo de Renca que muestra los puntos limpios más importantes (Municipalidad, Plaza, Cerro Renca, Parque Las Palmeras). Permite filtrar contenedores por tipo de material reciclable y muestra una tarjeta con detalles de capacidad actual (porcentaje de llenado).
3. **Escaneo QR**: Modal que simula una cámara encendida con una línea de escaneo láser animada. El usuario selecciona el contenedor y los residuos que trae para simular una carga de puntos automática.
4. **Tienda y Cupones**: Permite cambiar puntos por saldo de transporte (tarjeta Bip!) o descuentos en negocios locales de Renca. Genera un cupón virtual en formato de "ticket de papel troquelado" con un código de barra simulado para presentar en comercios.
