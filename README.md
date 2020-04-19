# NodeJs API - Sami

## Fake Auth
> This is a test API. Therefore, the user for get a valid token is adm and de password is adm

## OS
> This app was developed on Windows. If you want run this app on Linux or Mac, the scripts section on package.json need to be adapted.

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
    "start": "export NODE_ENV=dev&& export NODE_PATH=src&& nodemon server.js",
    "test": "export NODE_ENV=test&& export PORT=80&& export BASE_URL=http://localhost&& export NODE_PATH=src&& nyc mocha test/* --exit"
},
```

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
