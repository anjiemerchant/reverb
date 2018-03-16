import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({ handleClick, isLoggedIn}) => (
  <div className="container nav">
    <div className="container">
      <img className="nav-img" src="/cassette.svg" alt="cassette" />
      <h1>Reverb</h1>
    </div>
    <nav>
      {isLoggedIn &&
        <div>
          <Link to="/songs">Top 20</Link>
          <Link to={`/summary`}>Quantify My Taste</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      }
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.name
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
