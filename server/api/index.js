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
    // //   // need to add this to the req.body:
    //   req.requestOptArr = [];
    //   req.requestCallback = spotify.top
    //   next()
    // } else {
    //   // send response instead of pipe
    // }

  }).pipe(res)
});

router.post('/summary', (req, res, next) => {
  let options = spotify.featuresAggregate(req.body.accessToken, req.body.ids)
  request.get(options, (error, response, body) => {
    console.log('error', error);
    console.log('response', response);
    console.log('body', body);

    // if (body.error && body.error.status === 401) {
    //     req.requestOptArr = req.body.ids;
    //     req.requestCallback = spotify.featuresAggregate // will need to be invoked with accessToken THEN options
    //     next()
    //   } else {
    //     // do the returning instead of pipe
    //     //e.g. res.send(body)
    //   }
  })
  .pipe(res)
});

// https://developer.spotify.com/web-api/get-audio-features/
router.post('/songs/:id', (req, res, next) => {
  let options = spotify.features(req.body.accessToken, req.params.id)

  request.get(options, (error, response, body) => {
    console.log('error', error);
    console.log('response', response);
    console.log('body', body);
    // if (body.error.status === 401) {
    //   // ALTERNATE TO PREVIOUS EXAMPLE
    //   req.requestCallback = spotify.featuresReverse.bind(null, req.params.id) // so now req.requestCallback just has to be invoked with accesstoken
    //   next()
    // } else {
    //   // do the returning instead of pipe (i.e. res.send())
    // }
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
