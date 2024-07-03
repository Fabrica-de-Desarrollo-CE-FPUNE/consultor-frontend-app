# Consultor (Nombre Oficial aún por definir).
Es una app móvil tanto para Android como para IOS, consume los servicios de [nuestra API](https://github.com/Fabrica-de-Desarrollo-CE-FPUNE/bqs-service), que a su vez consume los datos de el [Consultor de nuestra Facultad](http://servicios.fpune.edu.py:82/consultor/index.php).
## Configuración Inicial
Para evitar problemas con la instalación y usos de frameworks y dependencias, en PowerShell y con permisos de administrador usamos
```PowerShell
Set-ExecutionPolicy Unrestricted
```
Posteriormente instalamos el cliente de Ionic de forma global con 
```PowerShell
npm install -g @ionic/cli
```
Si ya realizaste la descarga del repositorio, usar el siguiente comando dentro del mismo para descargar todas las dependencias necesarias.
``
npm install
``
Finalmente, para ejecutar de manera local el servidor frontend usamos:
```PowerShell
ionic serve
```
