const mongoose = require("mongoose");

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }
  dataBaseConnectionMongoDB() {
    this.mongoDBConnection = mongoose
      .connect("mongodb://localhost/nodejs")
      .then(() => {
        console.log("Successfully connection with mongoDB");
      })
      .catch((error) => {
        console.log(`Error to get connection with mongoDB: ${error}`);
      });
  }
}
module.exports = new Connection();
