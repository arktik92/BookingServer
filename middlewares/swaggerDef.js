const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'PCO API',
        version: '1.0.0',
        description: 'API for PCO',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development',
        },{
            url: 'http://127.0.0.1:8080',
            description: 'Production'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    } 
    }

    module.exports = swaggerDefinition;