const mongoose = require("mongoose");
const logger = require("./logger");

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => logger.log("info", "DB is connected"))
  .catch((err) => logger.error(err));
module.exports = mongoose;
