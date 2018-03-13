import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import {MeasureDefinitions} from './measure-definitions'

class TraitBarChart extends Component {
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
          <ResponsiveContainer>
            <BarChart
            width={1000}
            height={500}
            data={this.state.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis
            dataKey="trait"
            />
            <YAxis />
            <Bar
            dataKey="value"
            // fill="#34113f"
            fill="#faa916"
            />
            </BarChart>
            </ResponsiveContainer>
          </div>
        <MeasureDefinitions />
      </div>
      )
    }
  }
}

const mapState  = (state, ownProps) => ({
    data: ownProps.data
  })

export default connect(mapState, null)(TraitBarChart);
