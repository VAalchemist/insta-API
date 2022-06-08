const express = require("express");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));



// log mongo queries that are executed
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`👾 Connected to localhost:${PORT}`));