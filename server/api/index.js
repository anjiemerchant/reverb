const router = require('express').Router()
const request = require('request');
const spotify = require('../db/spotify.js')
module.exports = router


// https://developer.spotify.com/web-api/get-current-users-profile/

// router.get('/me', function(req, res, next) {
//   request({authOptions})
//     .pipe(res);
// });

// https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/
router.get('/recent', function(req, res, next) {
  request(spotify.getRecent(req.body.accessToken)
  ).pipe(res);
});

// https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
router.get('/top/:artistsOrTracks', function(req, res, next) {
  request(spotify.top(req.params.artistsOrTracks, req.body.accessToken)
  ).pipe(res);
});


module.exports = router;
