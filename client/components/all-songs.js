import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs } from '../store'

const AllSongs = props => (
        <div>
          <ul>
          {props.songs && props.songs.map(song => {
            return (
              <Link key={song.id} to={`/songs/${song.id}`}>
              <li>
                <p>{song.name}</p>
                <p>{song.artists[0].name}</p>
              </li>
              </Link>
            )
          })}
          </ul>
        </div>
)


// Container
const mapState = (state) => {
  return {
    accessToken: state.user.accessToken,
    songs: state.songs.items
  }
}

const mapDispatch = { fetchSongs }

export default connect(mapState, mapDispatch)(AllSongs);
