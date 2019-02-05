import React, {Component} from 'react'
import '../style/Person.css'

class Person extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    let markupBasicsPersonNameLabel = {__html: ''}
    let markupBasicsPersonIdentityLabel = {__html: ''}
    let markupPersonsName = {__html: ''}
    let markupPersonsIdentity = {__html: ''}


    if ((this.props.dataReady) && (this.props.activePerson !== null)) {

      markupBasicsPersonNameLabel = {__html: this.props.parsedDataBasics.personNameLabel[0][this.props.language]['#markup']}
      markupBasicsPersonIdentityLabel = {__html: this.props.parsedDataBasics.personIdentityLabel[0][this.props.language]['#markup']}
      markupPersonsName = {__html: this.props.parsedDataPersons[this.props.activePerson]['name'][0][this.props.language]['#markup']}
      markupPersonsIdentity = {__html: this.props.parsedDataPersons[this.props.activePerson]['identity'][0][this.props.language]['#markup']}

    }

    return(
      <div
        className={(this.props.activePerson !== null) ? 'person-container a-person-selected' : 'person-container'}
        >
        <div
          className={((this.props.position === this.props.activePerson) && (this.props.activePersonSwitch === 'on')) ? 'personTab show' : 'personTab hide'}
          id={"person-tab-" + this.props.position}
        >
          <div
            className="label-tab"
            dangerouslySetInnerHTML={markupBasicsPersonNameLabel}
          />
          <div
            className="value-tab"
            dangerouslySetInnerHTML={markupPersonsName}
          />
          <div
            className="label-tab"
            dangerouslySetInnerHTML={markupBasicsPersonIdentityLabel}
          />
          <div
            className="value-tab"
            dangerouslySetInnerHTML={markupPersonsIdentity}
          />
        </div>
        <div
          className={((this.props.position === this.props.activePerson) && (this.props.activePersonSwitch === 'on')) ? 'person on' : 'person off'}
          id={"person-" + this.props.position}
        />
      </div>
    )
  }
}

export default Person
