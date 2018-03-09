import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="container nav">
    <div className="container">
      <img className="nav-img" src="/cassette.svg" alt="cassette" />
      <h1>Reverb</h1>
    </div>
    <nav>
      {isLoggedIn && (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/songs">Top 10</Link>
          <Link to={`/top/summary`}>Quantify</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
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
