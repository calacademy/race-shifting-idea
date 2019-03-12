import React, {Component} from 'react'
import '../style/Details.css'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    let markupBtnLabel2000 = {__html: ''}
    let markupBtnLabel1960 = {__html: ''}
    let markupBtnLabel1930 = {__html: ''}
    let markupBtnLabel1870 = {__html: ''}
    let markupBtnLabel1790 = {__html: ''}
    let markupInfoEyebrowLabel = {__html: ''}
    let markupHdrLabel = {__html: ''}
    let markupInfo = {__html: ''}

    if ((this.props.dataReady) && (this.props.activePerson !== null)) {

      if ((typeof this.props.parsedDataPersons[this.props.activePerson]['buttonLabel2000'][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1960'][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1930'][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1870'][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1790'][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataBasics.personInfoEyebrowLabel[0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['headerLabel' + this.props.currentYear +''][0][this.props.language] !== 'undefined')
      && (typeof this.props.parsedDataPersons[this.props.activePerson]['info' + this.props.currentYear +''][0][this.props.language] !== 'undefined'))
      {
        markupBtnLabel2000 = {__html: this.props.parsedDataPersons[this.props.activePerson]['buttonLabel2000'][0][this.props.language]['#markup']}
        markupBtnLabel1960 = {__html: this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1960'][0][this.props.language]['#markup']}
        markupBtnLabel1930 = {__html: this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1930'][0][this.props.language]['#markup']}
        markupBtnLabel1870 = {__html: this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1870'][0][this.props.language]['#markup']}
        markupBtnLabel1790 = {__html: this.props.parsedDataPersons[this.props.activePerson]['buttonLabel1790'][0][this.props.language]['#markup']}
        markupInfoEyebrowLabel = {__html: this.props.parsedDataBasics.personInfoEyebrowLabel[0][this.props.language]['#markup']}
        markupHdrLabel = {__html:  this.props.currentYear + ': ' + this.props.parsedDataPersons[this.props.activePerson]['headerLabel' + this.props.currentYear +''][0][this.props.language]['#markup']}
        markupInfo = {__html:  this.props.parsedDataPersons[this.props.activePerson]['info' + this.props.currentYear +''][0][this.props.language]['#markup']}
      }

    }

    return(
      <div
        className={(this.props.activePerson !== null) ? 'details show' : 'details hide'}
        id={"details-" + this.props.activePerson}
        >
          <div className="details-nav">
            <button
              className={this.props.currentYear === '2000' ? 'selected' : ''}
              onTouchEnd={(e) => this.props.handlerSelectYear(e, '2000')}
              onClick={(e) => this.props.handlerSelectYear(e, '2000')}
              >
              <h3>2000 Census</h3>
              <h4
                dangerouslySetInnerHTML={markupBtnLabel2000}
              />
            </button>
            <button
              className={this.props.currentYear === '1960' ? 'selected' : ''}
              onTouchEnd={(e) => this.props.handlerSelectYear(e, '1960')}
              onClick={(e) => this.props.handlerSelectYear(e, '1960')}
              >
              <h3>1960 Census</h3>
              <h4
                dangerouslySetInnerHTML={markupBtnLabel1960}
              />
            </button>
            <button
              className={this.props.currentYear === '1930' ? 'selected' : ''}
              onTouchEnd={(e) => this.props.handlerSelectYear(e, '1930')}
              onClick={(e) => this.props.handlerSelectYear(e, '1930')}
              >
              <h3>1930 Census</h3>
              <h4
                dangerouslySetInnerHTML={markupBtnLabel1930}
              />
            </button>
            <button
              className={this.props.currentYear === '1870' ? 'selected' : ''}
              onTouchEnd={(e) => this.props.handlerSelectYear(e, '1870')}
              onClick={(e) => this.props.handlerSelectYear(e, '1870')}
              >
              <h3>1870 Census</h3>
              <h4
                dangerouslySetInnerHTML={markupBtnLabel1870}
              />
            </button>
            <button
              className={this.props.currentYear === '1790' ? 'selected' : ''}
              onTouchEnd={(e) => this.props.handlerSelectYear(e, '1790')}
              onClick={(e) => this.props.handlerSelectYear(e, '1790')}
              >
              <h3>1790 Census</h3>
              <h4
                dangerouslySetInnerHTML={markupBtnLabel1790}
              />
            </button>

          </div>
          <div className="details-info">
            <h4
              dangerouslySetInnerHTML={markupInfoEyebrowLabel}
            />
            <h2
              dangerouslySetInnerHTML={markupHdrLabel}
            />
            <p
              dangerouslySetInnerHTML={markupInfo}
            />
          </div>

      </div>
    )

  }

}

export default Details
