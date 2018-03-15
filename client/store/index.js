import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import currentSong from './currentSong'
import songs from './songs'
import allSongTraits from './allSongTraits'


const reducer = combineReducers({user, songs, currentSong, allSongTraits})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './currentSong'
export * from './songs'
export * from './allSongTraits'
