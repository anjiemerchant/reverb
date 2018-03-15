// action types
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// action creators
export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  song
});

// reducer
export default (song = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.song;

  default:
    return song;
  }
}
