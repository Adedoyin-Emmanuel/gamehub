FROM node:22.11-alpine3.19 as build_stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API_URL=http://localhost:8080

RUN npm run build

FROM nginx:1.27.3-alpine

COPY --from=build_stage /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]