const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
async function connect() {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGO_URL, () => {
    console.log("Connected To Database");
  });
}
async function disconnect() {
  mongoose.disconnect(() => {
    console.log("Disconneted To Database");
  });
}
module.exports = { connect, disconnect };
