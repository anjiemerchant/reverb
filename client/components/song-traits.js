import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongTraits } from '../store'
import { BarChart} from './bar-chart'

class SongTraits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      songTraits: this.props.songTraits
    }
  }

  componentDidMount() {
    const songId = this.props.match.params.songId;
    this.props.fetchSongTraits(this.props.accessToken, songId);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.songTraits !== oldProps.songTraits) {
      this.setState({
        songTraits: newProps.songTraits
      })
    }
  }

  render() {
    const song = this.props.song[0] || []
    const songName = song.name || ''
    const songArtists = song.artists ? song.artists[0].name : []

    if (!this.state.songTraits) return <div />;
    else {
      return (
          <div>
            <h2>{songName} by {songArtists}</h2>
            <div>{this.state.songTraits.length && this.state.songTraits.map(trait => { return (
              <div key={trait.index}>
                {trait.trait}: {trait.value}
              </div>
             ) })} </div>
          </div>
      )
    }
  }
}

// Container
const mapState = (state) => {
  const song = state.songs.filter(songEl => songEl.id === state.songTraits.id)

  const songTraitsEdited = [
    {"trait": "acousticness", "value": state.songTraits.acousticness},
    {"trait": "danceability", "value": state.songTraits.danceability},
    {"trait": "energy", "value": state.songTraits.energy},
    {"trait": "instrumentalness", "value": state.songTraits.instrumentalness},
    {"trait": "liveness", "value":state.songTraits.liveness},
    {"trait": "speechiness", "value": state.songTraits.speechiness},
    {"trait": "valence", "value": state.songTraits.valence}
  ]

  return {
    accessToken: state.user.accessToken,
    songTraits: songTraitsEdited,
    song
  }
}

const mapDispatch = { fetchSongTraits }

export default connect(mapState, mapDispatch)(SongTraits);
