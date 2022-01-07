require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

const account = require("./routes/account");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Database");
  }).catch((error) => {
      console.log(error)
  });

// parse json
app.use(express.json())


// session to keep track of user
app.use(
  session({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
  })
);

// get all account related routes
app.use('/account/', account)

// home page
app.get("/", (req, res) => {
  res.send("Hello Guest");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
