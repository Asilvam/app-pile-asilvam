const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
module.exports = mongoose;
