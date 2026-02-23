# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_REDIRECT_URI
ARG AUTH0_AUDIENCE

COPY package*.json ./
RUN npm install
COPY . .

RUN sed -i "s|AUTH0_DOMAIN_PLACEHOLDER|$AUTH0_DOMAIN|g" src/environments/environment.prod.ts && \
    sed -i "s|AUTH0_CLIENT_ID_PLACEHOLDER|$AUTH0_CLIENT_ID|g" src/environments/environment.prod.ts && \
    sed -i "s|AUTH0_REDIRECT_URI_PLACEHOLDER|$AUTH0_REDIRECT_URI|g" src/environments/environment.prod.ts && \
    sed -i "s|AUTH0_AUDIENCE_PLACEHOLDER|$AUTH0_AUDIENCE|g" src/environments/environment.prod.ts

RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
