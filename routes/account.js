const express = require("express");
const bcrypt = require("bcrypt");
const userValidation = require("../util/username-validation");
const User = require("../models/users");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("This is the login page!");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const match = await bcrypt.compare(password, user.hashedPassword);

  if (match == true) {
    console.log(`User: ${username} has been logged in`);
    return res.send(`Logged in with user: ${username}`);
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
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(404)
      .send({ success: false, msg: "Please check name or password" });
  } else {
    if (userValidation(username)) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({ username, hashedPassword });
      await user.save();
      res.send(`Created account for user: ${username}`);
      console.log(`User: ${username} created`)
    } else {
      res.status(400).send({
        success: false,
        msg: "Username is invalid. Must only contain alphanumeric characters (letters or numbers only)",
      });
    }
  }
});

module.exports = router;
