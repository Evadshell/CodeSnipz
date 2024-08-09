FROM node:20-alpine

# Install necessary packages including ODBC dependencies
# RUN apk add --no-cache python3 make g++ unixodbc-dev

WORKDIR /app

COPY package*.json ./
# COPY package-lock.json .

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

CMD npm run build
