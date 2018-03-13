import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {displayName} = props

  return (
    <div className="login">
      <h4>Reverb uses your most played Spotify songs to quantify your music taste.</h4>
      <a href="/auth/spotify" className="login-link">
        <img className="spotify-logo" src="/spotify.png" alt="spotify logo" />
        <div>Click to {displayName} with Spotify</div>
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
    name: 'login',
    displayName: 'login',
    error: state.user.error
  })

const mapSignup = state => ({
    name: 'signup',
    displayName: 'sign up',
    error: state.user.error
  })

const mapDispatch = dispatch => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
