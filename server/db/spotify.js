
module.exports = {
  top: accessToken => ({
    url: `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
      // limit=50
      // time_range=long_term (several years)
      // time_range=medium_term (six months)
      // time_range=short_term (last month)
  }),
  // features: (accessToken, id) => ({
  //   url: `https://api.spotify.com/v1/audio-features/${id}`,
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + accessToken,
  //     'Content-Type': 'application/json'
  //   }
  // }),
  featuresReverse: (id, accessToken)  => ({
    url: `https://api.spotify.com/v1/audio-features/${id}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }),
  // featuresAggregate: (accessToken, ids) => {
  //   const stringDelimitedIds = ids.join(',')
  //   return {
  //     url: `https://api.spotify.com/v1/audio-features/?ids=${stringDelimitedIds}`,
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Bearer ' + accessToken,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // },
  featuresAggregateReverse: (ids, accessToken) => {
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
  // appAccess: () => {
  //   return {
  //     url: 'https://accounts.spotify.com/api/token',
  //     headers: {
  //       'Authorization': `Basic <base64 encoded ${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_ID}>`
  //     },
  //     body: {
  //       'grant_type': 'client_credentials'
  //     }
  //   }
  // },
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
