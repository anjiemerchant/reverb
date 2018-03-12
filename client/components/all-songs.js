import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


 const AllSongs = ({displaySongs, name, spotifyId}) => {
  return (
        <div className="main">
            {name ?
            <h2>{name}'s Top 20</h2>
            : <h2>{spotifyId}'s Top 20 </h2>
            }
            <h4>Click on a song to see how it rates in terms of acousticness, danceability, energy, instrumentalness, liveness, speechiness, and valence. Defintions included after the click.</h4>
            <div className="album-display">
            {displaySongs && displaySongs.map(song => {
              return (
                <div key={song.id} className="top-song">
                <Link to={`/songs/${song.id}`}>
                  <p>{song.name} by {song.artists[0].name}</p>
                  <img className="album-thumbmail" src={song.album.images[0].url} />
                </Link>
                </div>
              )
            })}
            </div>
          </div>
        )
  }

// Container
const mapState = state => ({
    displaySongs: state.songs.slice(0, 20),
    name: state.user.name,
    spotifyId: state.user.spotifyId
  })

export default connect(mapState, null)(AllSongs);
