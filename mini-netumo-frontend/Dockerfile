FROM node:20.19.2-alpine

# Declare build-time variables
ARG VITE_APP_NAME
ARG VITE_API_URL
ARG VITE_WS_URL
ARG VITE_APP_ENV

WORKDIR /client

COPY package.json ./

RUN npm install --timeout=60000
RUN npm install -g serve

# Copy project files
COPY . .

# Inject env vars for Vite
ENV VITE_APP_NAME=$VITE_APP_NAME \
    VITE_API_URL=$VITE_API_URL \
    VITE_WS_URL=$VITE_WS_URL \
    VITE_APP_ENV=$VITE_APP_ENV

# Run build with injected env
RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"] 