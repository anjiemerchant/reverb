import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentSong} from '../store'
import TestBarChart from './test-bar-chart'
import TestRadarChart from './test-radar-chart'

class SongTraits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSong: this.props.currentSong,
      currentSongTraits: this.props.currentSongTraits,
      selectedChart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const currentSongId = this.props.match.params.songId;
    const currentSong = this.props.songs.filter(song => song.id === currentSongId)[0];
    setCurrentSong(currentSong);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.currentSong !== oldProps.currentSong) {
      this.setState({
        currentSong: newProps.currentSong,
        currentSongTraits: newProps.currentSongTraits
      })
    }
  }

  handleClick() {
    this.setState({
      selectedChart: !this.state.selectedChart
    })
  }

  render() {
    const songName = this.state.currentSong.name || ''
    const songArtists = this.state.currentSong.artists ? this.state.currentSong.artists[0].name : []
    console.log('this.state', this.state)
    if (!this.state.currentSongTraits[0].value) return <div />;
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
            <TestRadarChart data={this.state.currentSongTraits} />
            : <TestBarChart data={this.state.currentSongTraits} />
            }
          </div>
        </div>
      )
    }
  }
}

// Container
const mapState = state => {
  const currentSongTraits = state.allSongTraits.filter(songEl => songEl.id === state.currentSong.id)

  const songTraitsEdited = [
    {trait: "acousticness", value: currentSongTraits.acousticness},
    {trait: "danceability", value: currentSongTraits.danceability},
    {trait: "energy", value: currentSongTraits.energy},
    {trait: "instrumentalness", value: currentSongTraits.instrumentalness},
    {trait: "liveness", value: currentSongTraits.liveness},
    {trait: "speechiness", value: currentSongTraits.speechiness},
    {trait: "valence", value: currentSongTraits.valence}
  ]

  return {
    currentSongTraits: songTraitsEdited,
    currentSong: state.currentSong,
    songs: state.songs
  }
}

const mapDispatch = {setCurrentSong}

export default connect(mapState, mapDispatch)(SongTraits);
