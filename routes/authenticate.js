const express = require('express')

const router = express.Router()

router.post("/authenticate", (req, res) => {
  console.log("Yesssir");
});


module.exports = router