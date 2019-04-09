import React, { Component } from 'react'
import '../style/Animation.css'

class Animation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      filebase: '',
      frames: 0
    }
  }

  componentDidMount() {
    if (this.props.currentAnim === 'attract') {
      this.setState({
        name: 'attract',
        filebase: 'RaceAttract_',
        frames: 1798
      })
    }
  }

  render() {

    let images = []

    if (this.props.dataReady) {

      for (let i = 0; i < this.state.frames; i++) {
        let fiver = ('0000' + i).slice(-5)
        images.push(
          <img
            key={i}
            src={process.env.REACT_APP_ANIMATION_PATH + "animation/" + this.state.name + "/" + this.state.filebase + "" + fiver + ".jpg"}
            alt="" />
        )
      }

    }

    return(
      <div className="animation">
        <div
          id="container-images" className={this.state.name === this.props.currentAnim ? 'attract-animation play-' + this.state.name : 'attract-animation'}>
          {images}
        </div>
      </div>
    )
  }
}

export default Animation
