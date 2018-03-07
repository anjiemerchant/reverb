
module.exports = {
  getRecent: (accessToken) => ({
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
    // query: "limit=50"
  }),
  top: (accessToken, artistsOrTracks) => ({
    url: `https://api.spotify.com/v1/me/top/${artistsOrTracks}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
      // limit=50
      // time_range=long_term (several years)
      // time_range=medium_term (six months)
      // time_range=short_term (last month)
  })
}
