const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 - GROUP 2 FINAL PROJECT',
    description: 'Mediatized'
  },
  host: 'localhost:8080', //'***********.herokuapp.com',
  schemes: ['http'], //['https'],
  tags: [
    {
      name: 'Audio',
      description: 'Operations for Audio Content'
    },
    {
      name: 'Video',
      description: 'Operations for Video Content'
    },
    {
      name: 'Documents',
      description: 'Operations for Documents'
    },
    {
      name: 'Users',
      description: 'Operations for Users'
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
