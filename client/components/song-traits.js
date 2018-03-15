import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarChart from './bar-chart';
import RadarChart from './radar-chart';
import {setCurrentSong} from '../store';

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
    this.props.setCurrentSong(currentSong);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentSong !== this.props.currentSong) {
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
    if (!this.state.currentSongTraits.length) return <div />;
    else {
      return (
        <div className="main">
          <div className="container">
            <h2 className="graph-title">{songName} by {songArtists}</h2>

            <label className="switch">
              <input onClick={this.handleClick}type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div>
            {this.state.selectedChart ?
            <RadarChart data={this.state.currentSongTraits} />
            : <BarChart data={this.state.currentSongTraits} />
            }
          </div>
        </div>
      )
    }
  }
}

// Container
const mapState = state => {
  const currentSongTraits = state.allSongTraits.filter(songEl => songEl.id === state.currentSong.id)[0]

  let songTraitsEdited = []

  if (currentSongTraits) {
    songTraitsEdited = [
      {trait: "acoustics", value: currentSongTraits.acousticness},
      {trait: "danceability", value: currentSongTraits.danceability},
      {trait: "energy", value: currentSongTraits.energy},
      {trait: "instrumentals", value: currentSongTraits.instrumentalness},
      {trait: "speechiness", value: currentSongTraits.speechiness},
      {trait: "liveness", value: currentSongTraits.liveness},
      {trait: "valence", value: currentSongTraits.valence}
    ]
}

  return {
    currentSongTraits: songTraitsEdited,
    currentSong: state.currentSong,
    songs: state.songs
  }
}

const mapDispatch = {setCurrentSong}

export default connect(mapState, mapDispatch)(SongTraits);
