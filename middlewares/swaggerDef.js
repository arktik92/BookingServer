const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'PCO API',
        version: '1.0.0',
        description: 'API for Booking and Ordering',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development',
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