import axios from 'axios';

// action types
const GET_SINGLE_SONG_TRAITS = 'GET_SINGLE_SONG_TRAITS';

// action creators
const getSingleSongTraits = traits => ({
  type: GET_SINGLE_SONG_TRAITS,
  traits
});

// reducer
export default (traits = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SONG_TRAITS:
      return action.traits;

  default:
    return traits;
  }
}

// thunk creators
export const fetchSongTraits = (accessToken, id) => {
  return dispatch => {
    return axios.post(`/api/songs/${id}`, {accessToken})
      .then(res => res.data)
      .then(traits => dispatch(getSingleSongTraits(traits)))
      .catch(err => console.error('error fetching traits', err))
  }
}
