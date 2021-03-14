const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();

server.use(cors());
server.use(express.json());

// set template engine middlewares
server.set('view engine', 'ejs');

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// config express static server
const staticServerPath = './public'; // relative to the root of the project
server.use(express.static(staticServerPath));

server.get('/card', (req, res) => {
   // get card data
   const cardData = {
     name: "Dayana",
     job: "Profesora",
     email: "dayana@adalab.es",
     phone: "123456778",
     linkedin: "dayana-romero",
     github: "dayana",
     photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS...lstv/Z",
     palette: 3,
   };
   console.log("card data", cardData);
 
   // response with rendered template
   if (cardData) {
     res.render('pages/card', cardData);
   } else {
     res.render('pages/card-not-found');
   }
});

server.post('/card', (req, res) => {
  console.log(req.body);
  const response = {};

  if( !req.body.name || req.body.name.trim() === '' ) {
    response.success = false;
    response.error   = "Parameter name cannot be empty.";
  }
  else {
    // Save to db

    response.success = true;
    response.cardURL = "https://TODO-VA-BIEN.com/";
  }

  res.json(response);
});

// not found error
server.get('*', (req, res) => {
  // relative to this directory
  const notFoundFileRelativePath = '../public/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(__dirname, notFoundFileRelativePath);
  res.status(404).sendFile(notFoundFileAbsolutePath);
});