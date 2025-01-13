require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { APP_HOST, APP_PORT } = process.env;
const connection = require("./configurazione.js");
const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  OptionsSuccessStatus: 200,
};

const moviesRouter = require("./routers/moviesRouter");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/movies", moviesRouter);

const notFound = require("./middleware/notFound");
const errorsHandler = require("./middleware/errorHandler");

app.use(errorsHandler);
app.use(notFound);

app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
