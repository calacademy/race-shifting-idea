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

    let markupBasicsAttractHeader = {__html: ''}
    let markupBasicsAttractCta = {__html: ''}

    if ((this.props.parsedDataBasics) && (this.props.dataReady)) {

      markupBasicsAttractHeader = {__html: this.props.parsedDataBasics.attractHeader[0][this.props.language]['#markup']}
      markupBasicsAttractCta = {__html: this.props.parsedDataBasics.attractCta[0][this.props.language]['#markup']}

    }

    return(
      <div
        id="attract"
        onTouchEnd={(e) => this.props.handlerCloseAttract(e)}
        onClick={(e) => this.props.handlerCloseAttract(e)}
        >
        <div className="attract-text-container">
          <h1 dangerouslySetInnerHTML={markupBasicsAttractHeader} />
          <button><span dangerouslySetInnerHTML={markupBasicsAttractCta} /></button>
        </div>
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
