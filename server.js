const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/insta-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// log mongo queries that are executed
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`👾 Connected to localhost:${PORT}`));