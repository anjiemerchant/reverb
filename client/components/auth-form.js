import React from 'react';
import {connect} from 'react-redux';

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

const mapLogin = state => ({
    name: 'login',
    displayName: 'login',
    error: state.user.error
  })

export const Login = connect(mapLogin, null)(AuthForm)
