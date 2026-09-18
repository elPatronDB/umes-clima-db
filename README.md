# UMES Clima v3

## Descripción del proyecto
UMES Clima es una aplicación desarrollada en Ionic (Angular) que permite a los usuarios consultar el clima actual de su ubicación automáticamente, mediante la integración con el GPS del dispositivo. Además, la aplicación permite guardar un historial de los registros climáticos y adjuntar una fotografía a cada uno de ellos, con la posibilidad de guardar las fotos capturadas en la galería del dispositivo.

### Funcionalidades
- **Consulta de clima**: Obtiene la latitud y longitud actuales a través del GPS y consulta la API meteorológica Open-Meteo.
- **Historial de registros**: Almacena las consultas climáticas en un arreglo local y muestra información como la temperatura, sensación térmica, humedad y velocidad del viento.
- **Fotografías**: Permite utilizar la cámara nativa del dispositivo para capturar y asociar fotografías a cada registro climático.

## Plugins utilizados
Se han utilizado los siguientes plugins de Capacitor para la integración de hardware nativo:
- `@capacitor/geolocation`: Para acceder a las coordenadas GPS (latitud y longitud) actuales del dispositivo.
- `@capacitor/camera`: Para acceder a la cámara del dispositivo y capturar fotografías, así como para guardar dichas imágenes en la galería del teléfono.

## Permisos configurados (Android)
En la plataforma Android, se configuraron los siguientes permisos dentro del archivo `AndroidManifest.xml` para garantizar el correcto funcionamiento de los plugins:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />

<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
```
Estos permisos garantizan el acceso a la red para las consultas a la API, el acceso al hardware de GPS para la ubicación precisa, y los permisos de lectura/escritura en el almacenamiento para poder guardar las fotografías en la galería.
