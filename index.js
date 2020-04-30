const CubejsServer = require('@cubejs-backend/server');
const express = require('express');
const jwt = require('jsonwebtoken');

const server = new CubejsServer();
const app = express();

server.listen().then(({ port, app }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);

  // Add custom route to handle client authorization
  app.post('/auth/cubejs-token', (req, res) => {
    if (req.body.login == 'admin' && req.body.password == 'admin') {
      return res.json({
        // Take note: cubejs expects the JWT payload to contain an object!
        token: jwt.sign({ u: req.user }, process.env.CUBEJS_API_SECRET, { expiresIn: '1h' })
      })
    } else {
      return res.json({ error: 'auth_fail'});
    }
  })

}).catch(e => {
  console.error('Fatal error during server start: ');
  console.error(e.stack || e);
});


