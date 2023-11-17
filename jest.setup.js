const { main } = require('./server/models/db'); 
const startServer = require('./server/index');

module.exports = async () => {

  // Connect to MongoDB before all tests
  global.__MONGO_URI__ = 'mongodb://127.0.0.1:27017/diary';
  global.__MONGO_DB_NAME__ = 'diary'; 
  await main();
};

module.exports = async () => {
    global.__SERVER__ = await startServer();
  };