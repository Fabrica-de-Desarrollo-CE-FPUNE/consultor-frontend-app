# Etapa 1: Construcción (Node)
FROM node:22-alpine as builder

# Declaramos el argumento que recibiremos del comando build
ARG API_URL
# Lo convertimos en ENV para que el script de shell lo pueda leer
ENV API_URL=$API_URL

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Copiamos y ejecutamos el script de sustitución SOBRE EL TS
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN /usr/local/bin/docker-entrypoint.sh

# Ahora que el .ts está modificado, compilamos
RUN npm run build

# Etapa 2: Servir (Nginx)
FROM nginx:stable-alpine

# Configuración de seguridad (Usuario no-root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN touch /tmp/nginx.pid && \
    chown -R appuser:appgroup /tmp/nginx.pid /var/cache/nginx /var/log/nginx

# Copiamos la configuración de Nginx y el build inmutable
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]