# Use official Node.js image as the build environment
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production && npx ng run tis-otp-frontend:server:production

# Use official Nginx image for serving the built app
FROM nginx:alpine
COPY --from=build /app/dist/tis-otp-frontend/browser /usr/share/nginx/html
COPY --from=build /app/dist/tis-otp-frontend/server /usr/share/nginx/html/server
COPY --from=build /app/dist/tis-otp-frontend /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
