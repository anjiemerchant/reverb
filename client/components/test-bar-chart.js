import React, { Component } from 'react';
import {connect} from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts';

class TestBarChart extends Component {
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
          <BarChart
          width={1000}
          height={500}
          data={this.state.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis
          dataKey="trait"
          />
          <YAxis />
          <Bar dataKey="value"
          // fill="#34113f"
          fill="#faa916"
          />
          </BarChart>
        </div>
        <div>
          <h3> Measure definitions, <a href="https://developer.spotify.com/web-api/object-model/#audio-features-object">according to Spotify</a></h3>
          <ul>

          <li>
          <p><b>Acousticness</b></p>
          <p>A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</p>
          </li>

          <li>
          <p><b>Danceability</b></p>
          <p> Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>
          </li>

          <li>
          <p><b>Energy</b></p>
          <p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
          </li>

          <li>
          <p><b>Instrumentalness</b></p>
          <p>Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.</p>
          </li>

          <li>
          <p><b>Speechiness</b></p>
          <p>Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.</p>
          </li>

          <li>
          <p><b>Liveness</b></p>
          <p>Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.</p>
          </li>

          <li>
          <p><b>Valence</b></p>
          <p> A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
          </p>
          </li>

          </ul>
        </div>
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

export default connect(mapState, null)(TestBarChart);
