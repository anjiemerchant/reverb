const editSongTraitNames = obj => {
  return [
    {trait: 'acoustics', value: obj.acousticness},
    {trait: 'danceability', value: obj.danceability},
    {trait: 'energy', value: obj.energy},
    {trait: 'instrumentals', value: obj.instrumentalness},
    {trait: 'speechiness', value: obj.speechiness},
    {trait: 'liveness', value: obj.liveness},
    {trait: 'valence', value: obj.valence}
  ]
}

module.exports = {editSongTraitNames}
