FROM node:22.11-alpine3.19 as build_stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.3-alpine

RUN addgroup app && adduser -S -G app app

USER app

COPY --from=build_stage /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]