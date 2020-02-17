# Woolies X coding test

## Getting started
```
$ git clone https://github.com/ashleydass/wooliesx.git
$ cd ./wooliesx
$ npm install
$ npm start
```

## Test
```
$ npm test
```

## URLs for test

* Exercise 1: https://ashleydass-wooliesx.azurewebsites.net/api
* Exercise 2: https://ashleydass-wooliesx.azurewebsites.net/api/products
* Exercise 3: https://ashleydass-wooliesx.azurewebsites.net/api

## Using Postman

```
GET /api/user HTTP/1.1
Host: ashleydass-wooliesx.azurewebsites.net
Cache-Control: no-cache
Postman-Token: 1bbcde07-bdee-4a40-5b2b-2d8be4c64532
```

```
GET /api/products/sort HTTP/1.1
Host: ashleydass-wooliesx.azurewebsites.net
Cache-Control: no-cache
Postman-Token: e500a586-5acf-8bff-26f2-35c1ae81af9e
```

```
POST /api/resource/trolleyCalculator?token=5394d58a-82aa-4df9-84cc-6152336e9014 HTTP/1.1
Host: dev-wooliesx-recruitment.azurewebsites.net
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 3bab859a-3db6-93a0-6a8f-08081fa12c24

{
  "products": [
    {
      "name": "Test Product B",
      "price": 10
    }
  ],
  "specials": [
    {
      "quantities": [
        {
          "name": "Test Product B",
          "quantity": 20
        }
      ],
      "total": 50
    }
  ],
  "quantities": [
    {
      "name": "Test Product B",
      "quantity": 30
    }
  ]
}
```