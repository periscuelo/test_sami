# NodeJs API - Sami

## Fake Auth
> This is a test API. Therefore, the user for get a valid token is adm and de password is adm

## OS
> This api was developed on Windows. If you want run this api on Linux or Mac, the scripts section on package.json need to be adapted.

Windows
```
"scripts": {
    "start": "set NODE_ENV=dev&& set NODE_PATH=src&& nodemon server.js",
    "test": "set NODE_ENV=test&& set PORT=80&& set BASE_URL=http://localhost&& set NODE_PATH=src&& nyc mocha test/* --exit"
},
```

Linux or Mac
```
"scripts": {
    "start": "export NODE_ENV=dev && export NODE_PATH=src && nodemon server.js",
    "test": "export NODE_ENV=test && export PORT=80 && export BASE_URL=http://localhost && export NODE_PATH=src && nyc mocha test/* --exit"
}
```

## Docker

Put the yml below in root folder beside api folder.
```
#docker-compose.yml

version: '3'

services:
  webserverSami:
    image: node
    restart: always
    working_dir: /data/api/
    command: bash -c "npm i && npm start"
    stdin_open: true
    tty: true
    environment:
      CHOKIDAR_USEPOLLING: 'true'
      CHOKIDAR_INTERVAL: 300
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./api:/data/api
      - /data/api/node_modules
    depends_on:
      - dbSami
  dbSami:
    image: mongo
    restart: always

```
> In this case, you need change de mongo uri in config/mongo.js, localhost needs to be dbSami.  
And the scripts in package.jon need to be adapted like informed above.

Command to start the server  
`$ docker-compose up -d`

## Requirements
* NodeJs  
* MongoDB

## Technologies
* Restify
* Mongoose
* JWT

## URL'S
GET https://localhost  
POST https://localhost/auth  

## Protected URL'S by JWT
GET https://localhost/beneficiaries  `List All`  
GET https://localhost/beneficiaries?name=e `Filter by name`  
GET https://localhost/beneficiaries/id `Filter by id`  
POST https://localhost/beneficiaries `Create Data`  
PUT https://localhost/beneficiaries/id `Update Data`  
DELETE https://localhost/beneficiaries/id  `Delete Data`

## Project setup commands inside api folder
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Test api
```
npm test
```
