require("dotenv").config();
const express = require("express");
const { APP_HOST, APP_PORT } = process.env;
const connection = require("./configurazione.js");
const app = express();

const moviesRouter = require("./routers/moviesRouter");
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
