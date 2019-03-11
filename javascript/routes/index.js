var express = require('express');
var router = express.Router();
var us_states = require('../us_state.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find My Election', states: us_states });
});

/* POST search endpoint */
router.post('/search', function(req, res) {
  const data = req.body
  if (!(data.state || data.zip)) {
    let results = "You need to select a state or enter a zip code."
    res.render('index', { title: 'Find My Election', states: us_states, results: results })
  }
  else {
    let results = "We have a state or zip code."
    res.render('index', { title: 'Find My Election', states: us_states, results: results })
  }
})

module.exports = router;
