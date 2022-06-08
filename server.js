const express = require("express");
const db = require('./config/connection');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`👾 Connected to port ${PORT}!`);
  });
});