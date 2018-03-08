const router = require('express').Router()
const request = require('request');
const spotify = require('../db/spotify.js')
module.exports = router


// https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
router.post('/top', (req, res, next) => {
  let options = spotify.top(req.body.accessToken, req.params.tracks)

  request.get(options, (error, response, body) => {
    console.log('error', error);
    console.log('response', response);
    console.log('body', body);
  }).pipe(res)
});


// https://developer.spotify.com/web-api/get-audio-features/
router.post('/songs/:id', (req, res, next) => {
  let options = spotify.features(req.body.accessToken, req.params.id)

  request.get(options, (error, response, body) => {
    console.log('error', error);
    console.log('response', response);
    console.log('body', body);
  }).pipe(res)
});

// https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/
router.post('/recent', (req, res, next) =>  {
  let options = spotify.getRecent(req.body.accessToken)

  request.get(options, (error, response, body) => {
    console.log('error', error);
    console.log('response', response);
    console.log('body', body);
  }).pipe(res)
});

module.exports = router;
