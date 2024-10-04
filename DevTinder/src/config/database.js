const mongoose = require("mongoose");
const MONGODBURI =
  "mongodb+srv://tusharshitole6767:%40Tshitole3132@userbook.up8qm.mongodb.net/DevTinder";

const connectDB = async () => {
  await mongoose.connect(MONGODBURI);
};

module.exports = connectDB;


