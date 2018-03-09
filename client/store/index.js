import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import songTraits from './songTraits'
import songs from './songs'
import allSongTraits from './allSongTraits'


const reducer = combineReducers({user, songTraits, songs, allSongTraits})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songTraits'
export * from './songs'
export * from './allSongTraits'
