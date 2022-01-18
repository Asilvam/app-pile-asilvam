const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
module.exports = mongoose;
