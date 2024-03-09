const { client } = require('../config/config.database');

class DatabaseConnection {
  
  async connect() {
    try {
        await client.connect();
        this.Client = client;
        console.log(' DATABASE CONNECTION ESTABLISHED SUCCESSFULLY...');
        return this.Client;
    } catch (error) {
      console.error(' DATABASE CONNECTION FAILED ', error.message);
      throw error;
    }
  }
}

module.exports = new DatabaseConnection();
