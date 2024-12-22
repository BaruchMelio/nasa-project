const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { mysqlConnect } = require('./services/mysql');
const { setupLaunchesDb, loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  const conn = await mysqlConnect();
  await setupLaunchesDb(conn);
  await loadPlanetsData();
  // await loadLaunchData();
  
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
