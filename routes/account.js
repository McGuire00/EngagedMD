const express = require("express");
const bcrypt = require("bcrypt");
const userValidation = require("../util/username-validation");
const User = require("../models/users")

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("This is the login page!");
});

router.post("/login",(req, res) => {
  const { userName, password } = req.body;

  const user = User.findOne({ userName });
  const match = bcrypt.compare(password, user.hashedPassword, () => {

  });

  if (match == true) {
    console.log("logged in!");
    return res.send(`Logged in with user: ${user}`);
  } else {
    return res.send("Incorrect username or password");
  }
});

router.post("/signup", async (req, res) => {
  /*
    Password checks:
      - empty username/password fields
      - if alphanumeric

  */
  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(hashedPassword)
  if (!userName || !hashedPassword) {
    res
      .status(404)
      .send({ success: false, msg: "Please check name or password" });
  } else {
    if (userValidation(userName)) {
      res.send(`Created account for user: ${userName}`);
    } else {
      res.status(400).send({
        success: false,
        msg: "Username is invalid. Must only contain alphanumeric characters (letters or numbers only)",
      });
    }
  }
});

module.exports = router;
