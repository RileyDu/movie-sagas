const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => { //STRETCH GOAL
  // Add query to get all genres
  res.sendStatus(500)
});

module.exports = router;