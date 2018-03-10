import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongTraits } from '../store'
import TestBarChart from './test-bar-chart'
import TestRadarChart from './test-radar-chart'

class SongTraits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      songTraits: this.props.songTraits,
      selectedChart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const songId = this.props.match.params.songId;
    this.props.fetchSongTraits(this.props.accessToken, this.props.refreshToken, songId);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.songTraits !== oldProps.songTraits) {
      this.setState({
        songTraits: newProps.songTraits
      })
    }
  }

  handleClick() {
    this.setState({
      selectedChart: !this.state.selectedChart
    })
  }

  render() {
    const song = this.props.song[0] || []
    const songName = song.name || ''
    const songArtists = song.artists ? song.artists[0].name : []

    if (!this.state.songTraits[0].value) return <div />;
    else {
      return (
        <div className="main">
          <div className="container">
            <h2>{songName} by {songArtists}</h2>

            <label className="switch">
              <input onClick={this.handleClick}type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div>
            {this.state.selectedChart ?
            <TestRadarChart data={this.state.songTraits} />
            :  <TestBarChart data={this.state.songTraits} />
            }
          </div>
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
    refreshToken: state.user.refreshToken,
    songTraits: songTraitsEdited,
    song
  }
}

const mapDispatch = { fetchSongTraits }

export default connect(mapState, mapDispatch)(SongTraits);
