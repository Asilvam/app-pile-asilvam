require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const { mongoose } = require("./database");


//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/reservas", require("./routes/reserva.routes"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//starting server
app.listen(app.get("port"), () => {
  console.log(`Server ON`);
});
