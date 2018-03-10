import axios from 'axios';

// action types
const GET_ALL_SONGS = 'GET_ALL_SONGS';

// action creators
const getAllSongs = songs => ({
  type: GET_ALL_SONGS,
  songs
  });

// reducer
export default (songs = [], action) => {
  switch (action.type) {
    case GET_ALL_SONGS:
      return action.songs;

  default:
    return songs;
  }
}

// thunk creators
export const fetchSongs = (accessToken, refreshToken) => {
  return dispatch => {
    return axios.post('/api/top', {accessToken, refreshToken})
      .then(res => res.data)
      .then(songs => dispatch(getAllSongs(songs.items)))
      .catch(err => console.error('error fetching songs', err))
  }
}
