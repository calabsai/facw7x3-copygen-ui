FROM node:16.20.0-alpine3.17 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Production Stage
FROM nginx:1.17.10-alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80

# Custom nginx.conf

CMD ["nginx", "-g", "daemon off;"]