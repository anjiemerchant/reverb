import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongTraits } from '../store'

class SongTraits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      songTraits: this.props.songTraits
    }
  }

  componentDidMount() {
    const songId = this.props.match.params.songId;
    this.props.fetchSongTraits(this.props.accessToken, songId);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.songTraits !== oldProps.songTraits) {
      this.setState({
        songTraits: newProps.songTraits
      })
    }
  }

  render() {
    console.log(this.props.songTraits, 'this.props.songTraits')
    console.log(this.state.songTraits, 'this.state.songTraits')
      return (
        <div>
          <h2>{this.state.songTraits}</h2>
        </div>
      )
    }
}

// Container
const mapState = (state) => {
  return {
    accessToken: state.user.accessToken,
    traits: state.traits
  }
}

const mapDispatch = { fetchSongTraits }

export default connect(mapState, mapDispatch)(SongTraits);
