var express = require('express');
var router = express.Router();
var us_states = require('../us_state.js');
const fetch = require('node-fetch');

/* Generally would put such a function in a "tools" or "helpers" directory
but keeping here for to keep my code in as little places as possible for
this small project.
*/
/*
Takes a state and city and generates a Turbovote API url with OCD-IDs.
*/
function getUrl(state, city) {
  // Add required state and city data to the Turbovote API url
  let url = "https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:"
  url += state.toLowerCase()
  url += ",ocd-division/country:us/state:"
  url += state.toLowerCase() + "/place:" + city.toLowerCase().replace(/\s/g, "")
  return url
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find My Election', states: us_states });
});

/* POST search endpoint */
router.post('/search', function(req, res) {
  const data = req.body
  /* Would like to change the below conditional to pass if zip code entered,
  but need an API key for Google's geocode API to get state from zip code. */
  if (!(data.state || data.city)) {
    res.render('index', { title: 'Find My Election', states: us_states, error: "You need enter a city and select a state." })
  }
  else {
    let url = getUrl(data.state, data.city)
    /* Fetch data from Turbovote and then send to index template
    or send error message to index template if no returned data or error */
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    })
    .then(response => response.json())
    .then(response_json => {
      if (response_json.length === 0) {
        res.render('index', { title: 'Find My Election', states: us_states, error: "There are no results for your city and state." })
      }
      else {
        res.render('index', { title: 'Find My Election', states: us_states, results: response_json })
      }
    })
    .catch( error => {
      res.render('index', { title: 'Find My Election', states: us_states, error: "There was an error processing your request." })
    })
  }
})

module.exports = router;
