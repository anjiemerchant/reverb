import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import {MeasureDefinitions} from './measure-definitions'

class TestRadarChart extends Component {
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
      return (
      <div>
       <div className="chart center-container">
          <RadarChart
          width={600}
          height={500}
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

export default connect(mapState, null)(TestRadarChart);
