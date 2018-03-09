
module.exports = {
  top: (accessToken) => ({
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
  features: (accessToken, id) => ({
    url: `https://api.spotify.com/v1/audio-features/${id}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }),
  featuresAggregate: (accessToken, ids) => {
    const stringDelimitedIds = ids.join(',')
    return {
      url: `https://api.spotify.com/v1/audio-features/?ids=${stringDelimitedIds}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }
  }
}

      // getRecent: (accessToken) => ({
  //   url: 'https://api.spotify.com/v1/me/player/recently-played',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + accessToken,
  //     'Content-Type': 'application/json'
  //   }
  //   // query: "limit=50"
  // }),
