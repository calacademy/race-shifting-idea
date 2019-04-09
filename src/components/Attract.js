import React, {Component} from 'react'
import '../style/Attract.css'
import Animation from './Animation'

class Attract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foobar: null
    }
  }

  render() {
    return(
      <div
        id="attract"
        onTouchEnd={(e) => this.props.handlerCloseAttract(e)}
        onClick={(e) => this.props.handlerCloseAttract(e)}
        >
        <div className="container-animation">
          <Animation
            dataReady={this.props.dataReady}
            currentAnim="attract"
          />
        </div>
      </div>
    )
  }
}

export default Attract
