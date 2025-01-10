require("dotenv").config();
const express = require("express");
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
const connection = require("./configurazione.js");
const app = express();

//SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening at ${domain}:${port}`);
});
