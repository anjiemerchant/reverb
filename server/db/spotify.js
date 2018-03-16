
module.exports = {
  top: accessToken => ({
    url: `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }),
  features: (id, accessToken)  => ({
    url: `https://api.spotify.com/v1/audio-features/${id}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }),
  featuresAggregate: (ids, accessToken) => {
    const stringDelimitedIds = ids.join(',')
    return {
      url: `https://api.spotify.com/v1/audio-features/?ids=${stringDelimitedIds}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }
  },
  refreshUserAccess: refreshToken => {
    return {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
      }
    }
  }
}
