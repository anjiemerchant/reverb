const router = require('express').Router()
const request = require('request');
const spotify = require('../db/spotify.js')
module.exports = router


// https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
router.post('/top', (req, res, next) => {
  let options = spotify.top(req.body.accessToken)

  request.get(options, (error, response, body) => {
    console.log('response', response);
    console.log('body', body);
    console.log('error', error);

    // if (body.error.status === 401) {
    //   // need to add this to the req.body
    //   let newOptions = spotify.refreshUserAccess(req.body.refreshToken)

    //   request.post(newOptions, (error, response, body) => {

        //User.findOne({where: {spotifyId: req.body.spotifyId}})
        //.then(user => user.update({accessToken: response.access_token}))
        // response.access_token
    //   }
    // }
    // not 401 then send the data back (and done)
    // else [401 (unauthorized)] request the refresh -- then make request again
  }).pipe(res)
});

router.post('/top/summary', (req, res, next) => {
  let options = spotify.featuresAggregate(req.body.accessToken, req.body.ids)
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
// router.post('/recent', (req, res, next) =>  {
//   let options = spotify.getRecent(req.body.accessToken)

//   request.get(options, (error, response, body) => {
//     console.log('error', error); // if error other than 401 send to error handling middleware?
//     console.log('response', response);
//     console.log('body', body);

//   }).pipe(res)
// });


module.exports = router;
