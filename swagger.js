
const swaggerAutogen = require('swagger-autogen')();

const doc = {
info: {
    title: 'My API',
    description: 'Description'
},
host: '127.0.0.1:8080'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);