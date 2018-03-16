# Reverb

Reverb uses your most played Spotify songs to quantify your music taste.

Reverb is a web application built to visualize Spotify user and song data. Using Passport.js for Spotify oAuth authentication, Reverb fetches a user's most played songs. A subsequent call to the Spotify API allows for capture of song attribute data, which is visualized on the front-end using Recharts. Built using Express, Sequelize, React, Redux, and React-Redux, a deployed version of the application can be found at:

http://reverb-music.herokuapp.com/

## Installation
To install the project, fork the project to your github and clone a copy onto your local machine. Run npm install to install project dependencies.

### Spotify API and oAuth Setup
In order to make API calls to Spotify endpoints, you'll need to create a Spotify developer account and app (https://beta.developer.spotify.com).

To complete oAuth setup:
- On the Spotify Application develoepr console, you'll be asked to provide a requires input of a redirect URI. For now, enter: http://localhost:8080/auth/spotify/callback.
- In the secrets.js file that comes with this repo, find the secrets.js file. Add the following variables, updating the first two with the credentials you receive from Spotify:

process.env.SPOTIFY_CLIENT_ID = *your client id here*
process.env.SPOTIFY_CLIENT_SECRET = *your client id here*
process.env.SPOTIFY_CALLBACK = "http://localhost:8080/auth/spotify/callback"

### Database setup
You'll need to set up a Postgres database to store users' Spotify data (ids, access tokens, and refresh tokens). If you have postgres installed globally, run the command

createdb reverb

to intialize an empty database.

### Initializing a local server
Once you've completed the above, you're ready to sync your database and start a local server. Run npm start-dev.

## Authors
Anjali Merchant

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
A huge thanks to Kate Humphrey, John McDonald, and Leigh Steiner for their help in conceptualizing the approach.
