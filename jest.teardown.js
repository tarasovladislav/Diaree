const mongoose = require('mongoose');

module.exports = async () => {
  // Close the MongoDB connection after all tests
  await mongoose.connection.close();
};

module.exports = async () => {
    // Close the server after all tests
    await global.__SERVER__.close();
  };