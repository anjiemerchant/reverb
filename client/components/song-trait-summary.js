import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSongTraits } from '../store'
import BarChart from './bar-chart'
import TestBarChart from './test-bar-chart'


class SongTraitSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allSongTraits: this.props.allSongTraits
    }
  }

  componentDidMount() {
    const songs = this.props.songs || []
    const songIds = songs.map(song => song.id)
    this.props.fetchAllSongTraits(this.props.accessToken, songIds);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.allSongTraits !== oldProps.allSongTraits) {
      this.setState({
        allSongTraits: newProps.allSongTraits
      })
    }
  }

  render() {
    if (!this.state.allSongTraits) return <div />;
    else {
      return (
        <div className="main">
          <h2>A quantitative summary of your music taste, derived from averaging the follow measures across top songs (n = 50)</h2>
          {/* <BarChart data={this.state.allSongTraits} size={[500, 500]} /> */}
          <TestBarChart data={this.state.allSongTraits} />
        </div>
      )
    }
  }
}

// Container
const mapState = state => {

  const acousticness = state.allSongTraits ? state.allSongTraits.map(trait => trait.acousticness)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const danceability = state.allSongTraits ? state.allSongTraits.map(trait => trait.danceability)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const energy  = state.allSongTraits ? state.allSongTraits.map(trait => trait.energy)
                                                           .reduce((acc, val) => acc + val, 0) : null
  const instrumentalness  = state.allSongTraits ?  state.allSongTraits.map(trait => trait.instrumentalness)
                                                                      .reduce((acc, val) => acc + val, 0) : null
  const liveness  = state.allSongTraits ? state.allSongTraits.map(trait => trait.liveness)
                                                             .reduce((acc, val) => acc + val, 0) : null
  const speechiness  = state.allSongTraits ? state.allSongTraits.map(trait => trait.speechiness)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const valence  = state.allSongTraits ? state.allSongTraits.map(trait => trait.valence)
                                                            .reduce((acc, val) => acc + val, 0) : null

  const length = state.allSongTraits ? state.allSongTraits.length : null

  const songTraitsEdited = [
    {"trait": "acousticness", "value": acousticness / length},
    {"trait": "danceability", "value": danceability / length},
    {"trait": "energy", "value": energy / length},
    {"trait": "instrumentalness", "value": instrumentalness / length},
    {"trait": "liveness", "value": liveness / length},
    {"trait": "speechiness", "value": speechiness / length},
    {"trait": "valence", "value": valence / length}
  ]

  return {
    accessToken: state.user.accessToken,
    allSongTraits: songTraitsEdited,
    songs: state.songs
  }
}

const mapDispatch = { fetchAllSongTraits }

export default connect(mapState, mapDispatch)(SongTraitSummary);
