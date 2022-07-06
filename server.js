const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

mongoose.connect(
  "mongodb://localhost:3001/social-network",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// logging mongo queries being executed!
mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () =>
  console.log(`You are now connected to localhost:${PORT}`)
);
