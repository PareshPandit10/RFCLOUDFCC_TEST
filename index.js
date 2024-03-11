const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./src/routes/route');
const path = require('path');
const dotenv = require('dotenv')
const AMQPConnection = require('./src/connections/connection.amqp');
const AMQPService = require('./src/services/service.amqp');
dotenv.config();

const DB = require('./src/connections/connection.database');
const SocketConnection = require('./src/connections/connection.socket');
const SocketService = require('./src/services/service.socket');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1000mb' }));

app.use(cors());
app.use('/', route);

app.use('/heartBeat', (request, response) => {
  response.status(200).send(' SERVER IS LIVE ')
})

app.use(express.static(path.join(__dirname, 'dist')));

// Add a wildcard route handler to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, async () => {
  console.log(' SERVER IS RUNNING ON PORT: ' + PORT);
  initConnections();
});

async function initConnections() {

  // Initialize AMQP Connection
  await new AMQPConnection().connect();

  //Start AMQP Service
  await new AMQPService().startAMQPService();

  // Initialize Database Connection
  DB.connect();

  //Initialize Socket Connection
  new SocketConnection().connect(server);

  //Initialize Socket Service
  new SocketService().startSocketService();
}