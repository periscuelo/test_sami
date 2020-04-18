# sami

## Fake Auth
> This is a test API. Therefore, the user for get a valid token is adm and de password is adm

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
