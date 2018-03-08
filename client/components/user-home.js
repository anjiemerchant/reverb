import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchSongs } from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {

  componentDidMount(){
    this.props.fetchSongs(this.props.accessToken);
  }

  render() {

  return (
    <div>
      <h3>Welcome, {this.props.name}</h3>
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
    accessToken: state.user.accessToken
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
