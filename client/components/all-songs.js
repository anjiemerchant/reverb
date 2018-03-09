import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs } from '../store'

const AllSongs = props => (
        <div>
          <h3>Your Top 50</h3>
          <p>Below is a list of the 50 songs you've played most on Spotify over the past several years. Click on any to see how it rates in terms of acousticness, danceability, energy, instrumentalness, spechiness, and valence.</p>
          <ol>
          {props.songs && props.songs.map(song => {
            return (
              <Link key={song.id} to={`/songs/${song.id}`}>
              <li>
                <p>{song.name} by {song.artists[0].name}</p>
              </li>
              </Link>
            )
          })}
          </ol>
        </div>

)


// Container
const mapState = (state) => {
  return {
    accessToken: state.user.accessToken,
    songs: state.songs
  }
}

const mapDispatch = { fetchSongs }

export default connect(mapState, mapDispatch)(AllSongs);
