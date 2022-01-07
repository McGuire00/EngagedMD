require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

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

// parse form data
app.use(express.urlencoded({extended: false}))

// get all account related routes
app.use('/account/', account)

app.get("/", (req, res) => {
  res.send("Hello Guest");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
