import React, {Component} from 'react'
import '../style/Bar.css'

class Bar extends Component {

  render() {

    let markupBarPos0 = {__html: ''}
    let markupBarPos1 = {__html: ''}
    let markupBarPos2 = {__html: ''}
    let markupBarPos3 = {__html: ''}
    let markupBarPos4 = {__html: ''}
    let markupBarPos5 = {__html: ''}
    let markupBarPos6 = {__html: ''}

    if (this.props.currentYear !== null) {
      markupBarPos0 = {__html: this.props.parsedDataPersons[0]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos1 = {__html: this.props.parsedDataPersons[1]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos2 = {__html: this.props.parsedDataPersons[2]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos3 = {__html: this.props.parsedDataPersons[3]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos4 = {__html: this.props.parsedDataPersons[4]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos5 = {__html: this.props.parsedDataPersons[5]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
      markupBarPos6 = {__html: this.props.parsedDataPersons[6]['barLabel' + this.props.currentYear + ''][0][this.props.language]['#markup']}
    }

    return(
      <div id="bar">
        <div id="bar-tab-year"><span>{this.props.currentYear}</span></div>
        <div id="bar-tab-person-0" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos0}
        />
        <div id="bar-tab-person-1" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos1}
        />
        <div id="bar-tab-person-2" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos2}
        />
        <div id="bar-tab-person-3" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos3}
        />
        <div id="bar-tab-person-4" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos4}
        />
        <div id="bar-tab-person-5" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos5}
        />
        <div id="bar-tab-person-6" className="bar-tab-person"
          dangerouslySetInnerHTML={markupBarPos6}
        />
      </div>
    )

  }

}

export default Bar
