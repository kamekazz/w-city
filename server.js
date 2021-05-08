const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require('dotenv').config({ path: './config.env' });
const connectDb = require('./utilsServer/connectDb');
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {});

nextApp.prepare().then(() => {
  app.use('/api/signup', require('./api/signup'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/receiving_container', require('./api/receivingApiRouter'));

  app.all('*', (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log('Express server running');
  });
});
