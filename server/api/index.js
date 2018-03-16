const router = require('express').Router()
const spotify = require('../db/spotify.js')
const User = require('../db/models/user')
var axios = require('axios')

module.exports = router

// https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
router.post('/top', (req, res, next) => {
  let options = spotify.top(req.body.accessToken)

  axios.request(options)
    .then(response => res.send(response.data))
    .catch(err => {
      if (err.response.status === 401) {
        req.requestCallback = spotify.top
        next()
      }
    });
});

router.post('/summary', (req, res, next) => {
  let options = spotify.featuresAggregate(req.body.ids, req.body.accessToken);

  axios.request(options)
    .then(response => res.send(response.data))
    .catch(err => {
      if (err.response.status === 401) {
        req.requestCallback = spotify.featuresAggregate.bind(null, req.body.ids)
        next()
      }
    });
});

// https://developer.spotify.com/web-api/get-audio-features/
router.post('/songs/:id', (req, res, next) => {
  let options = spotify.features(req.params.id, req.body.accessToken)

  axios.request(options)
    .then(response => res.send(response.data))
    .catch(err => {
      if (err.response.status === 401) {
        req.requestCallback = spotify.features.bind(null, req.params.id)
        next()
      }
    });
});

router.post('*', (req, res, next) => {
  let options = spotify.refreshUserAccess(req.body.refreshToken);

  axios.request(options)
    .then(response => {
      User.findById(req.user.id)
        .then(foundUser => {
          return foundUser.update({accessToken: response.data.access_token})
        })
        .then(() => {
          let opt = req.requestCallback(response.data.access_token)
          axios.request(opt)
            .then(secondResponse => {
              res.send(secondResponse.data)
            })
            .catch(err => console.error("error fetching data following refresh of user token", err))
           })
    })
    .catch(err => console.error("error fetching data following refresh of user token", err))
  })


module.exports = router;
