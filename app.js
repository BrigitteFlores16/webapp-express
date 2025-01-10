require("dotenv").config();
const express = require("express");
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
const connection = require("./configurazione.js");
const app = express();

const moviesRouter = require("./routers/moviesRouter");
app.use(express.json());
app.use(express.static("public"));
app.use("/", moviesRouter);

//SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening at ${domain}:${port}`);
});
