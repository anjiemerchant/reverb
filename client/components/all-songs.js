import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs } from '../store'


class AllSongs extends Component {

  componentDidMount() {
    this.props.fetchSongs(this.props.accessToken);
  }


  render() {

    if (!this.props.songs) return <div>Your top songs are loading...</div>;

    else {
      return (
        <div className="main">
            <h2>{this.props.name}'s Top 20</h2>
            <h4>Below is a list of the twenty songs you've played most on Spotify over the past several years. Click on any to see how it rates in terms of acousticness, danceability, energy, instrumentalness, speechiness, and valence. Defintions included after the click.</h4>
            <div className="album-display">
            {this.props.songs && this.props.songs.map(song => {
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
  }
}


// Container
const mapState = (state) => {
  return {
    accessToken: state.user.accessToken,
    songs: state.songs.slice(0, 20),
    name: state.user.name,
  }
}

const mapDispatch = { fetchSongs }

export default connect(mapState, mapDispatch)(AllSongs);
