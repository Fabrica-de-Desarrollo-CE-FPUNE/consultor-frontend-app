#!/bin/sh

# Validar que la variable de entorno existe para evitar borrar el valor actual por vacío
if [ -z "$API_URL" ]; then
    echo "Error: La variable API_URL no está definida."
    exit 1
fi

# El comando busca 'const BASE_API_URL = "VALOR";' y lo reemplaza íntegramente
sed -i "s|const BASE_API_URL = \".*\";|const BASE_API_URL = \"${API_URL}\";|g" src/data/fetchers/ApiClient.ts

echo "Variable BASE_API_URL actualizada a: ${API_URL}"