const express = require('express')

const router = express.Router()

router.post("/home", (req, res) => {
  res.send("Home Page");
});

module.exports = router