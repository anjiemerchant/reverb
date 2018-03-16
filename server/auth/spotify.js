const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy;
const {User} = require('../db/models')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {

  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')

} else {

  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }


  passport.use(new SpotifyStrategy(spotifyConfig,
  (accessToken, refreshToken, profile, done) => {
    User.find({where: {spotifyId: profile.id}})
      .then(foundUser => foundUser
      ? done(null, foundUser)
      : User.create({
        spotifyId: profile.id,
        name: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
          .then(createdUser => done(null, createdUser))
      )
      .catch(done)
    })
  )

  router.get('/', passport.authenticate('spotify', {scope: ['user-top-read user-read-recently-played user-read-currently-playing']}))

  router.get('/callback', passport.authenticate('spotify', {
    successRedirect: '/songs',
    failureRedirect: '/login'
  }))


}
