import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "react-chartjs-2";

class TestBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        chartData: nextProps.data
      });
    }
  }

  render() {
    console.log("prrooopss", this.props);
      return (
        <BarChart width={500} height={500} data={this.state.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="trait" />
         <YAxis />
         <CartesianGrid strokeDasharray="3 3" />
         <Tooltip />
         <Bar dataKey="pv" fill="#473144" />
        </BarChart>
    );
  }
}

const mapState  = (state, ownProps) => {
  return {
    data: ownProps.data
  }
}

export default connect(mapState, null)(TestBarChart);
