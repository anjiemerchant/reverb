const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy;
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

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
    failureRedirect: '/'
  }))


}
