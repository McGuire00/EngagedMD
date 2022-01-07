const express = require("express");
const bcrypt = require("bcrypt");
const userValidation = require("../util/username-validation");
const User = require("../models/users");

const router = express.Router();


router.get("/welcome", (req, res) => {
    sess = req.session

    if(sess.token){
        res.send(`Hello, ${sess.user.username}`)
    } else {
        res.send('Please login first')
    }
})

router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const match = await bcrypt.compare(password, user.hashedPassword);

  if (match == true) {
    console.log(`User: ${username} has been logged in`);

    sess = req.session
    sess.token = process.env.AUTHENTICATION_TOKEN;

    req.session.user = user;
 
    return res.send({
      success: true,
      token: process.env.AUTHENTICATION_TOKEN,
    });
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
      console.log(`User: ${username} created`);
    } else {
      res.status(400).send({
        success: false,
        msg: "Username is invalid. Must only contain alphanumeric characters (letters or numbers only)",
      });
    }
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  console.log("Logged out");
  return res.send("Successfully logged out of account");
});

module.exports = router;
