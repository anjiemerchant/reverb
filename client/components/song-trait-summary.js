import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarChart from './bar-chart';
import RadarChart from './radar-chart';
import {editSongTraitNames} from '../../utils.js'

class SongTraitSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedChart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      selectedChart: !this.state.selectedChart
    })
  }

  render() {
      return (
        <div className="main">
          <div className="container">
          <h2 className="graph-title">A quantitative summary of your music taste, derived from averaging the following measures across your top songs (n = 50)</h2>
            <label className="switch">
              <input onClick={this.handleClick} type="checkbox" />
              <span className="slider round" />
            </label>
          </div>

          <div>
            {this.state.selectedChart ?
           <RadarChart data={this.props.allSongTraits} />
            : <BarChart data={this.props.allSongTraits} />
            }
          </div>
        </div>
      )
    }
  }

// Container

const mapState = state => {

  const features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechines', 'valence' ]

  let featuresObj = state.allSongTraits ? state.allSongTraits.reduce((acc, curr) => {
    features.forEach(feature => {
        if (!acc[feature]) acc[feature] = [curr[feature]]
        else acc[feature].push(curr[feature])
    })
    return acc
  }, {}) : null

  const featuresMean = {}
  for (let key in featuresObj) {
    featuresMean[key] = (featuresObj[key].reduce((acc, val) => acc + val, 0)) / featuresObj[key].length
  }

  const songTraitsEdited = editSongTraitNames(featuresMean)

  return ({allSongTraits: songTraitsEdited})

}

export default connect(mapState, null)(SongTraitSummary);
