import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Login} from './auth-form'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="container nav">
    <div className="container">
      <img className="nav-img" src="/cassette.svg" alt="cassette" />
      <h1>Reverb</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/songs">Top 20</Link>
          <Link to={`/top/summary`}>Quantify My Taste</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )
    : <Login />}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
