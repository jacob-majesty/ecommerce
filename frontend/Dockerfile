# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# 1. Define ARGs to receive values from docker-compose or .env
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_REDIRECT_URI
ARG AUTH0_AUDIENCE

COPY package*.json ./
RUN npm install
RUN npm install --save-dev @types/node
COPY . .

# 2. Use 'sed' to replace the ${VARIABLE} placeholders in your file
# This updates environment.prod.ts with real values from your .env
RUN sed -i "s|\${AUTH0_DOMAIN}|$AUTH0_DOMAIN|g" src/environments/environment.prod.ts && \
    sed -i "s|\${AUTH0_CLIENT_ID}|$AUTH0_CLIENT_ID|g" src/environments/environment.prod.ts && \
    sed -i "s|\${AUTH0_REDIRECT_URI}|$AUTH0_REDIRECT_URI|g" src/environments/environment.prod.ts && \
    sed -i "s|\${AUTH0_AUDIENCE}|$AUTH0_AUDIENCE|g" src/environments/environment.prod.ts

RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
