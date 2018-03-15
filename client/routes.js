import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, AllSongs, SongTraits, SongTraitSummary} from './components'
import {me, fetchSongs, fetchAllSongTraits} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user !== this.props.user) {
      if (!newProps.songs.length) {
        newProps.fetchSongs(newProps.user.accessToken, newProps.user.refreshToken)
      }
    }

    if (newProps.songs.length && !newProps.allSongTraits.length) {
      newProps.fetchAllSongTraits(newProps.user.accessToken, newProps.user.refreshToken, newProps.songIds)
      }
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        {
          isLoggedIn &&
            <Switch>
              <Route exact path="/songs" component={AllSongs} />
              <Route path="/summary" component={SongTraitSummary} />
              <Route path="/songs/:songId" component={SongTraits} />
              <Route path="/*" component={AllSongs} />
            </Switch>
        }
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
    isLoggedIn: !!state.user.id,
    user: state.user,
    songs: state.songs,
    songIds: state.songs.length ? state.songs.map(song => song.id) : [],
    allSongTraits: state.allSongTraits
  })

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchSongs(accessToken, refreshToken) {
      dispatch(fetchSongs(accessToken, refreshToken))
    },
    fetchAllSongTraits(accessToken, refreshToken, ids) {
      dispatch(fetchAllSongTraits(accessToken, refreshToken, ids))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
