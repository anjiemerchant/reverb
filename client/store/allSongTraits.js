import axios from 'axios';

// action types
const GET_ALL_SONG_TRAITS = 'GET_ALL_SONG_TRAITS';

// action creators
const getAllSongTraits = traits => ({
  type: GET_ALL_SONG_TRAITS,
  traits
});

// reducer
export default (allSongTraits = [], action) => {
  switch (action.type) {
    case GET_ALL_SONG_TRAITS:
      return action.traits;

  default:
    return allSongTraits;
  }
}

// thunk creators
export const fetchAllSongTraits = (accessToken, refreshToken, ids) => {
  return dispatch => {
    return axios.post(`/api/summary`, {accessToken, refreshToken, ids})
      .then(res => res.data)
      .then(traits => dispatch(getAllSongTraits(traits.audio_features)))
      .catch(err => console.error('error fetching traits', err))
  }
}
