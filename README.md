<b>Sistema Gestor de Ganado Lechero </b> <br>
El proyecto consiste en el desarrollo de un sistema multiplataforma par la gestión de ganado lechero, orientado a optimizar el control y la administración de las actividades realizadas dentro de la unidad productiva. 
La aplicación estará conformado por módulos, mediante los cuales se podrá gestionar, controlar la producción de leche, historial sanitario y ciclo reproductivo del ganado.

El sistema será desarrollado utilizando el framework Ionic, ya que permite crear aplicaciones multiplataforma mediante tecnologías web como HTML, CSS Y TypeScrip. Como servicio de backend se empleará Firebase,
el cual ofrece herramientas como base de datos en tiempo real, autenticación y almancenamiento en la nube, facilitando el desarrollo ágil del proyecto. Para la implementación de utilizará Visual Studio Code, como entorno de desarrollo, debido a su ligereza y compatibilidad con Ionic y Firebase.<br>
<b>🧩 Diagrama de clases </b> <br>

El diagrama de clases del sistema fue elaborado durante la etapa de análisis y diseño, y se encuentra disponible en la siguiente ruta:

📁 /docs/diagrama-clases.png

Este diagrama representa la estructura del sistema, incluyendo clases, atributos, métodos y relaciones entre ellas.<br>
Instalación y ejecución del proyecto
Para poder ejecutar este proyecto de manera correcta en un entorno local, sigue los pasos que se describen a continuación:
<b> Requisitos previos </b> <br>
Antes de comenzar, es necesario contar con las siguientes herramientas instaladas:<br>
Node.js (versión 16 o superior)<br>
npm (incluido con Node.js)<br>
Ionic CLI <br>
Para instalar Ionic CLI, ejecuta el siguiente comando: <br>
npm install -g @ionic/cli <br>

<b>Clonar el repositorio</b> <br>
Descarga el proyecto desde GitHub con el siguiente comando:<br>
git clone https://github.com/xanatl/ProyectoVianneyGaspar<br>
Accede a la carpeta del proyecto:<br>
cd ProyectoVianneyGaspar<br>

<b>Instalación de dependencias</b><br>
Una vez dentro del proyecto, instala las dependencias necesarias: <br>
npm install<br>

<b>Configuración adicional (solo en Windows)</b> <br>
Si estás utilizando PowerShell en Windows y aparece un error relacionado con la ejecución de scripts, ejecuta el siguiente comando: <br>
Set-ExecutionPolicy RemoteSigned<br>
Después, confirma escribiendo "Y" y presiona Enter.<br>
Nota: Este paso no es necesario si utilizas CMD, Git Bash o la terminal de VS Code.<br>


<b> Ejecutar el proyecto </b> <br>
Para iniciar el servidor de desarrollo, ejecuta: <br>
ionic serve<br>
Esto abrirá automáticamente el proyecto en el navegador en la dirección:<br>
http://localhost:8100 <br>
En la pagina principal introduce los siguientes datos para acceder a la gestión de usuarios:<br>
correo electronico: prueba@gmail.com <br>
contraseña: 000000 <br>


 <b>Problemas comunes</b><br>
Si aparece el error: "Invalid project type: angular-standalone"<br>
Solución:<br>
Actualizar Ionic CLI con el comando:<br>
npm install -g @ionic/cli<br>
O modificar el archivo ionic.config.json cambiando:<br>
"type": "angular-standalone"<br>
por:<br>
"type": "angular" <br>


Tecnologías utilizadas </b> <br>
Ionic Framework <br>
TypeScript<br>
Firebase </br>
<b>Implementación </b> <br>

En esta fase se desarrollaron las siguientes funcionalidades: <br>

 Inicio de sesión (Login) <br>
 Registro de nuevos usuarios <br>
 Gestión de usuarios <br>

Estas funcionalidades permiten validar el acceso al sistema y gestionar la creación de cuentas de usuario mediante un formulario conectado a una base de datos en firebase.<br>
<b>Autor</b> <br>
Vianney Xanatl Gaspar García
