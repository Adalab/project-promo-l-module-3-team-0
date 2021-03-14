const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();

server.use(cors());
server.use(express.json());

const serverPort = 3000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// config express static server
const staticServerPath = './public'; // relative to the root of the project
server.use(express.static(staticServerPath));

// not found error
server.get('*', (req, res) => {
  // relative to this directory
  const notFoundFileRelativePath = '../public/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(__dirname, notFoundFileRelativePath);
  res.status(404).sendFile(notFoundFileAbsolutePath);
});

server.get('/cards', (req, res) => {
  const response = {
    users: [{ name: 'Sofía' }, { name: 'María' }]
  };
  res.json(response);
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