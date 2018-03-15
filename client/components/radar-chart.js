import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import {MeasureDefinitions} from './measure-definitions'

class TraitRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  render() {

    if (!this.state.data[0].value) return <div>Your taste is being calculated...</div>

    else {
      console.log(this.state.data, "this.state.data")
      return (
      <div>
       <div className="chart center-container">
        <ResponsiveContainer>
          <RadarChart
          width={600}
          height={500}
          margin={{top: 5, right: 20, left: 20, bottom: 5}}
          data={this.state.data}>
          <PolarGrid />
          <PolarAngleAxis
          dataKey="trait" />
          <PolarRadiusAxis />
          <Radar
          dataKey="value"
          stroke="#8884d8"
          fill="#faa916"
          fillOpacity={0.6} />
          </RadarChart>
          </ResponsiveContainer>
        </div>
        <MeasureDefinitions />
      </div>
      )
    }
  }
}

const mapState  = (state, ownProps) => {
  return {
    data: ownProps.data
  }
}

export default connect(mapState, null)(TraitRadarChart);
