import React, {Component} from 'react'
import People from './People'
import Person from './Person'
import Bar from './Bar'
import PseudoBar from './PseudoBar'
import Details from './Details'
import '../style/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    let markupBasicsHeader = {__html: ''}
    let markupBasicsDescription = {__html: ''}
    let markupBasicsTapLabel = {__html: ''}
    let markupBasicsPollTeaser = {__html: ''}
    let markupBasicsPollButtonLabel = {__html: ''}

    if ((this.props.parsedDataBasics) && (this.props.dataReady)) {

      markupBasicsHeader = {__html: this.props.parsedDataBasics.header[0][this.props.language]['#markup']}
      markupBasicsDescription = {__html: this.props.parsedDataBasics.description[0][this.props.language]['#markup']}
      markupBasicsTapLabel = {__html: this.props.parsedDataBasics.tapLabel[0][this.props.language]['#markup']}
      markupBasicsPollTeaser = {__html: this.props.parsedDataBasics.pollTeaser[0][this.props.language]['#markup']}
      markupBasicsPollButtonLabel = {__html: this.props.parsedDataBasics.pollButtonLabel[0][this.props.language]['#markup']}

    }

    const _this = this
    let persons = []

    if (this.props.dataReady) {
      this.props.parsedDataPersons.forEach((item, i) => {
        persons.push(
          <Person
            key={i}
            position={i}
            activePerson={_this.props.activePerson}
            activePersonSwitch={_this.props.activePersonSwitch}
            language={_this.props.language}
            parsedDataBasics={_this.props.parsedDataBasics}
            parsedDataPersons={_this.props.parsedDataPersons}
            dataReady={_this.props.dataReady}
          />
        )
      })
    }

    return(
      <div id="main">
        <div id="left-column">
          <h2 dangerouslySetInnerHTML={markupBasicsHeader} />
          <p dangerouslySetInnerHTML={markupBasicsDescription} />
          <div
            id="tap-label-1"
            dangerouslySetInnerHTML={markupBasicsTapLabel}
          />
          <div id="bottom-container">
            <p dangerouslySetInnerHTML={markupBasicsPollTeaser} />
            <button
              onTouchEnd={(e) => this.props.handlerOpenPoll(e)}
              onClick={(e) => this.props.handlerOpenPoll(e)}
            ><span dangerouslySetInnerHTML={markupBasicsPollButtonLabel} /></button>
          </div>
        </div>
        <div id="full-width">
          <div
            id="tap-label-2"
            dangerouslySetInnerHTML={markupBasicsTapLabel}
            className={this.props.activePerson !== null ? 'hide' : 'show'}
          />
          <div
            id="pseudo-bar-container"
            className={this.props.activePerson === null ? 'hide' : 'show'}
            >
            <PseudoBar
              handlerSelectPerson={this.props.handlerSelectPerson}
            />
          </div>
          <div id="people-container">
            <People
              activePerson={this.props.activePerson}
              handlerSelectPerson={this.props.handlerSelectPerson}
              handlerDeselectPerson={this.props.handlerDeselectPerson}
            />
          </div>
          <div id="persons-container">
            <div
              id="bar-container"
              className={this.props.activePerson === null ? 'hide' : 'show'}
              >
              <Bar
                currentYear={this.props.currentYear}
                parsedDataPersons={this.props.parsedDataPersons}
                language={this.props.language}
              />
            </div>
            {persons}
            <div id="leg-fader" />
          </div>

          <div
            id="details-container"
            className={this.props.activePerson === null ? 'hide' : 'show'}
            >
            <Details
              currentYear={this.props.currentYear}
              activePerson={this.props.activePerson}
              language={this.props.language}
              parsedDataBasics={this.props.parsedDataBasics}
              parsedDataPersons={this.props.parsedDataPersons}
              handlerSelectYear={this.props.handlerSelectYear}
              handlerDetailsHeight={this.handlerDetailsHeight}
              dataReady={this.props.dataReady}
            />
          </div>

        </div>
      </div>
    )

  }

}

export default Main
