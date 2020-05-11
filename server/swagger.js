// Node Modules
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '1.0.0',
      description: 'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8888/api/v1',
      },
    ],
  },
  apis: ['./src/db/models/userModel.js', './src/db/models/lobbyModel.js', './src/routes/routes.js'],
};
const specs = swaggerJsdoc(options);

module.exports = specs;
