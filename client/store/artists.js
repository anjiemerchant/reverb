import axios from 'axios';

// action types
const GET_ALL_ARTISTS = 'GET_ALL_ARTISTS';

// action creators
const getAllArtists = artists => ({
  type: GET_ALL_ARTISTS,
  artists
});

// reducer
export default (artists = [], action) => {
  switch (action.type) {
    case GET_ALL_ARTISTS:
      return action.songs;

  default:
    return artists;
  }
}

// thunk creators
export const fetchArtists = accessToken => {
  return dispatch => {
    return axios.post('/api/top/artists', accessToken)
      .then(res => res.data)
      .then(artists => dispatch(getAllArtists(artists)))
      .catch(err => console.error('error fetching artists', err))
  }
}
