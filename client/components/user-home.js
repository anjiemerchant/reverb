import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchSongs } from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {

  componentDidMount(){
    this.props.fetchSongs(this.props.accessToken, this.props.refreshToken);
  }

  render() {

  return (
    <div className="main">
      <h2>Hey, {this.props.name}. Go explore.</h2>
    </div>
  )
}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    accessToken: state.user.accessToken,
    refreshToken: state.user.refreshToken
  }
}

const mapDispatch = { fetchSongs }


export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
