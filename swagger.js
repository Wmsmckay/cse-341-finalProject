const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 - GROUP 2 FINAL PROJECT',
    description: 'Mediatized'
  },
  // host: 'localhost:8080',
  host: 'cse-341-final-project.herokuapp.com',

  // change the host and schemes to work on localhost. Change back before pushing your branch to make sure the heroku app works
  schemes: ['https'], //['https'],
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
  ],
  definitions: {
    Audio: {
      title: 'Sibbie',
      audioType: 'mp3',
      description: 'A song about Sibbie',
      link: 'https://www.youtube.com/shorts/ASm9cw8z1Ug',
      contributor: {
        performers: ['Strong Bad'],
        writers: ['The Brothers Chaps'],
        publishers: ['The Brothers Chaps']
      },
      releaseDate: 'Jun 9, 2003',
      lengthSeconds: '0:33'
    },
    Video: {
      title: 'Song by Richard Paul Astley',
      videoType: 'mp4',
      description: 'A great song about love',
      link: 'https://youtu.be/dQw4w9WgXcQ',
      releaseDate: 'Oct 25, 2009',
      lengthSeconds: '3:32'
    },
    Document: {
      title: 'Darth Vader - The Good Guy Who Lost',
      docType: 'eBook',
      description:
        'The arch villain of the Star Wars series, Darth Vader, has been grossly misrepresented by historians.',
      link: 'https://www.obooko.com/free-arts-media-entertainment-books/darth-vader-the-good-guy-who-lost',
      author: 'M S Lawson'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
