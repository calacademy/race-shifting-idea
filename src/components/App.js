import React, { Component } from 'react'
import '../style/App.css'
import Loader from './Loader'
import Translator from './Translator'
import Credits from './Credits'
import Main from './Main'
import Poll from './Poll'
import Attract from './Attract'
import fetchJsonp from 'fetch-jsonp'

class App extends Component {
  constructor() {
    super()
    this.state = {
      display: 'loader', // loader || main || poll || credits || attract
      data: null,
      parsedDataBasics: null,
      parsedDataPersons: [{},{},{},{},{},{},{}], // assumes 7 people
      parsedDataPoll: null,
      parsedDataPollOptions: [{},{},{},{}], // assumes 4 options
      dataBasicsReady: false,
      dataPersonsReady: false,
      dataPollReady: false,
      dataPollOptionsReady: false,
      dataReady: false,
      dataCredits: null,
      currentLanguage: 'en', // en || es || zh || tl
      inactivityInt: 45000,
      dateLastTouch: null,
      activePerson: null,
      activePersonSwitch: 'off', // off || on
      currentYear: null
    }

    // Attract handler
    this.handlerCloseAttract = this._closeAttract.bind(this)

    // Loader handler
    this.handlerLoadComplete = this._loadComplete.bind(this)

    // Translator handlers
    this.handlerSelectLanguage = this._selectLanguage.bind(this)
    this.handlerOpenCredits = this._openCredits.bind(this)

    // Credits handlers
    this.handlerCloseCredits = this._closeCredits.bind(this)

    // Person object SVG hanlder
    this.handlerSelectPerson = this._selectPerson.bind(this)
    this.handlerDeselectPerson = this._deselectPerson.bind(this)

    // Details handler
    this.handlerSelectYear = this._selectYear.bind(this)

    // Main Poll Button handler
    this.handlerOpenPoll = this._openPoll.bind(this)
    // Poll Button handler
    this.handlerClosePoll = this._closePoll.bind(this)
    // Poll interaction handler
    this.handlerInteractPoll = this._interactPoll.bind(this)

  }

  _interactPoll() {
    this.setState({
      dateLastTouch: new Date()
    })
  }

  _closePoll() {
    this.setState({
      display: 'main',
      dateLastTouch: new Date()
    })
  }

  _openPoll() {
    this.setState({
      display: 'poll',
      dateLastTouch: new Date(),
      currentYear: null,
      activePersonSwitch: 'off',
      activePerson: null
    })
  }

  _selectYear(e, y) {
    e.preventDefault()
    this.setState({
      currentYear: y,
      dateLastTouch: new Date(),
    })
  }

  _selectPerson(n) {
    let s
    if (this.state.activePersonSwitch === 'off') {
      s = 'on'
    } else {
      s = 'off'
    }
    let y
    if (this.state.currentYear !== null) {
      y = this.state.currentYear
    } else {
      y = '2000'
    }
    if (n !== this.state.activePerson) {
      this.setState({
        activePerson: n,
        activePersonSwitch: 'on',
        currentYear: y,
        dateLastTouch: new Date()
      })
    } else {
      this.setState({
        activePerson: null,
        activePersonSwitch: s,
        currentYear: null,
        dateLastTouch: new Date()
      })
    }
  }

  _deselectPerson(n) {
    if (n === this.state.activePerson) {
      this.setState({
        activePerson: null,
        activePersonSwitch: 'off',
        currentYear: null,
        dateLastTouch: new Date()
      })
    }
  }

  _getLanguageName(l) {
    var lang = ''
    switch (l) {
      case "en":
        lang = 'English'
        break
      case "es":
        lang = 'Spanish'
        break
      case "zh":
        lang = 'Chinese'
        break
      case "tl":
        lang = 'Filipino'
        break
      default:
        break
    }
    return lang
  }

  _inactivityCheck() {
    var now = new Date()
    var check = new Date(now.getTime() - this.state.inactivityInt)
    if (this.state.dateLastTouch !== null) {
      if ((this.state.dateLastTouch < check) && (this.state.dataReady)) {
        this.setState({
          currentLanguage: 'en',
          display: 'attract',
          dateLastTouch: null,
          currentYear: null,
          activePersonSwitch: 'off',
          activePerson: null
        })
      }
    }
  }

  _getDataCredits() {
    var _this = this
    fetchJsonp(process.env.REACT_APP_REST_URL_CREDITS)
    //fetch("/dev-data/dataCredits.json")
    .then((response) => {
      return response.json()
    }).then((data) => {
      _this.setState ({
        dataCredits: data
      })
    }).catch((ex) => {
      console.log('JSON data credits fetch failed: fetching again in 30 seconds', ex)
      // try again in 30 sec
      setTimeout(() => {
       _this._getDataCredits()
     }, 30000)
    })
  }

  _getData() {
    const _this = this
    fetchJsonp(process.env.REACT_APP_REST_URL_TEXT, { timeout: 10000, })
    //fetch("/dev-data/data.json")
    .then((response) => {
      return response.json()
    }).then((data) => {
      _this.setState ({
        data: data
      })
      _this._prepareData()
    }).catch((ex) => {
      console.log('JSON data text fetch failed: fetching again in 30 seconds', ex)
      // try again in 30 sec
      setTimeout(() => {
       _this._getData()
     }, 30000)
    })
  }

  _prepareData() {
    const _this = this

    let dataBasics = {}
    let dataPoll = {}
    let dataPollOptions = []
    let dataPersons = []

    this.state.data.forEach((item, i) => {
      if (item.title_administrative === "Race Shifting Idea Basics") {
        dataBasics.items = item.items
      }
      else if (item.title_administrative === "Race Shifting Idea Poll") {
        dataPoll.items = item.items
      }
      else if (item.title_administrative.indexOf("Race Shifting Idea Poll Option") > -1) {
        dataPollOptions.push(item)
      }
      else if (item.title_administrative.indexOf("Race Shifting Idea Person") > -1) {
        dataPersons.push(item)
      }
    })

    // verify some data properties
    const requiredBasicsItemCount = 15
    const requiredPollItemCount = 11
    const requiredPollOptionCount = 4
    const requiredPersonCount = 7
    if (dataBasics.items.length !== requiredBasicsItemCount) {
      console.log('data error: basics items count')
      return
    }
    if (dataPoll.items.length !== requiredPollItemCount) {
      console.log('data error: poll items count')
      return
    }
    if (dataPollOptions.length !== requiredPollOptionCount) {
      console.log('data error: poll option count')
      return
    }
    if (dataPersons.length !== requiredPersonCount) {
      console.log('data error: person count')
      return
    }

    // [name of item in cms, name for this state obj]
    const arrDataBasicsItemsToParse = [
      ['header', 'header'],
      ['description', 'description'],
      ['tap-label', 'tapLabel'],
      ['poll-teaser', 'pollTeaser'],
      ['poll-button-label', 'pollButtonLabel'],
      ['person-name-label', 'personNameLabel'],
      ['person-identity-label', 'personIdentityLabel'],
      ['person-info-eyebrow-label', 'personInfoEyebrowLabel'],
      ['attract-header', 'attractHeader'],
      ['attract-cta', 'attractCta'],
      ['2000-button-header', 'buttonHeader2000'],
      ['1960-button-header', 'buttonHeader1960'],
      ['1930-button-header', 'buttonHeader1930'],
      ['1870-button-header', 'buttonHeader1870'],
      ['1790-button-header', 'buttonHeader1790']
    ]

    let itemsProcessedBasics = 0
    arrDataBasicsItemsToParse.forEach((item, i, arr) => {
      if (_this._breakDownParsedDataBasics(dataBasics, item[0], item[1])) {
        itemsProcessedBasics++
        if (itemsProcessedBasics === arr.length) {
          _this.setState ({
            dataBasicsReady: true
          })
        }
      }
    })

    // [name of item in cms, name for this state obj]
    const arrDataPersonItemsToParse = [
      ['name', 'name'],
      ['identity', 'identity'],
      ['2000-bar-label', 'barLabel2000'],
      ['1960-bar-label', 'barLabel1960'],
      ['1930-bar-label', 'barLabel1930'],
      ['1870-bar-label', 'barLabel1870'],
      ['1790-bar-label', 'barLabel1790'],
      ['2000-button-label', 'buttonLabel2000'],
      ['1960-button-label', 'buttonLabel1960'],
      ['1930-button-label', 'buttonLabel1930'],
      ['1870-button-label', 'buttonLabel1870'],
      ['1790-button-label', 'buttonLabel1790'],
      ['2000-header-label', 'headerLabel2000'],
      ['1960-header-label', 'headerLabel1960'],
      ['1930-header-label', 'headerLabel1930'],
      ['1870-header-label', 'headerLabel1870'],
      ['1790-header-label', 'headerLabel1790'],
      ['2000-info', 'info2000'],
      ['1960-info', 'info1960'],
      ['1930-info', 'info1930'],
      ['1870-info', 'info1870'],
      ['1790-info', 'info1790'],
    ]

    let itemsProcessedPersons = 0
    arrDataPersonItemsToParse.forEach((item, i, arr) => {
      itemsProcessedPersons++
      dataPersons.forEach((person, p) => {
        let items = {'items':dataPersons[p].items}
        if (_this._breakDownParsedDataPersons(p, items, item[0], item[1])) {
          if ((itemsProcessedPersons === arr.length) && (p === (dataPersons.length - 1))) {
            _this.setState ({
              dataPersonsReady: true
            })
          }
        }
      })
    })

    // [name of item in cms, name for this state obj]
    const arrDataPollItemsToParse = [
      ['header-eyebrow', 'headerEyebrow'],
      ['header', 'header'],
      ['description', 'description'],
      ['choose-header', 'chooseHeader'],
      ['question', 'question'],
      ['pro-label', 'proLabel'],
      ['con-label', 'conLabel'],
      ['submit-button-label', 'submitButtonLabel'],
      ['result-header', 'resultHeader'],
      ['responses-label', 'responsesLabel'],
      ['completed-label', 'completedLabel']
    ]

    let itemsProcessedPoll = 0
    arrDataPollItemsToParse.forEach((item, i, arr) => {
      if (_this._breakDownParsedDataPoll(dataPoll, item[0], item[1])) {
        itemsProcessedPoll++
        if (itemsProcessedPoll === arr.length) {
          _this.setState ({
            dataPollReady: true
          })
        }
      }
    })



    // [name of item in cms, name for this state obj]
    const arrDataPollOptionsToParse = [
      ['label', 'label'],
      ['answer', 'answer'],
      ['pro', 'pro'],
      ['con', 'con']
    ]

    let itemsProcessedPollOptions = 0
    arrDataPollOptionsToParse.forEach((item, i, arr) => {
      itemsProcessedPollOptions++
      dataPollOptions.forEach((option, o) => {
        let items = {'items':dataPollOptions[o].items}
        if (_this._breakDownParsedDataPollOptions(o, items, item[0], item[1])) {
          if ((itemsProcessedPollOptions === arr.length) && (o === (dataPollOptions.length - 1))) {
            _this.setState ({
              dataPollOptionsReady: true
            })
          }
        }
      })
    })
  }

  _breakDownParsedDataBasics(arrParsedData, cmsName, objName) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign({}, this.state.parsedDataBasics)
      dataGroupParsed[objName] = arrItem
      this.setState ({
        parsedDataBasics: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: dataBasics ' + cmsName)
      return false
    }
  }

  _breakDownParsedDataPersons(p, arrParsedData, cmsName, objName) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign([], this.state.parsedDataPersons)
      dataGroupParsed[p][objName] = arrItem
      this.setState ({
        parsedDataPersons: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: dataPersons ' + cmsName)
      return false
    }
  }

  _breakDownParsedDataPoll(arrParsedData, cmsName, objName) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign({}, this.state.parsedDataPoll)
      dataGroupParsed[objName] = arrItem
      this.setState ({
        parsedDataPoll: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: dataPoll ' + cmsName)
      return false
    }
  }

  _breakDownParsedDataPollOptions(p, arrParsedData, cmsName, objName) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign([], this.state.parsedDataPollOptions)
      dataGroupParsed[p][objName] = arrItem
      this.setState ({
        parsedDataPollOptions: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: dataPollOptions ' + cmsName)
      return false
    }

  }

  // Loader method
  _loadComplete() {
    this.setState({
      display: 'main',
      dateLastTouch: new Date()
    })
    setInterval(() => this._inactivityCheck(), 5000)
  }

  // Translator methods
  _selectLanguage(e, lang) {
    e.preventDefault()
    this.setState({
      currentLanguage: lang,
      dateLastTouch: new Date()
    })
  }

  _openCredits() {
    this.setState({
      display: 'credits',
      dateLastTouch: new Date(),
      currentYear: null,
      activePersonSwitch: 'off',
      activePerson: null
    })
  }
  _closeCredits() {
    this.setState({
      display: 'main',
      dateLastTouch: new Date()
    })
  }

  _closeAttract() {
    this.setState({
      display: 'main',
      dateLastTouch: new Date()
    })
  }

  componentDidMount() {
    this._getData()
    this._getDataCredits()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.dataReady) {
      // check for all data readiness
      if ((this.state.dataBasicsReady) &&
      (this.state.dataPersonsReady) &&
      (this.state.dataPollReady) &&
      (this.state.dataPollOptionsReady)) {
        this.setState({
          dataReady: true
        })
      }
    }
  }

  render() {

    return (
      <div id="app">
        <div id="container-loader"
          className={this.state.display === 'loader' ? 'show' : ''}>
          <Loader
            // needs to verify all data
            dataReady={this.state.dataReady}
            handlerLoadComplete={this.handlerLoadComplete}
          />
        </div>
        <div id="container-translator"
          className={this.state.display === 'loader' ? '' : 'show'}>
          <Translator
            language={this.state.currentLanguage}
            handlerSelectLanguage={this.handlerSelectLanguage}
            handlerOpenCredits={this.handlerOpenCredits}
            display={this.state.display}
           />
        </div>
        <div id="container-attract"
          className={this.state.display === 'attract' ? 'show' : ''}>
          <Attract
            parsedDataBasics={this.state.parsedDataBasics}
            language={this._getLanguageName(this.state.currentLanguage)}
            dataReady={this.state.dataReady}
            handlerCloseAttract={this.handlerCloseAttract}
          />
        </div>
        <div id="container-credits"
          className={this.state.display === 'credits' ? 'show' : ''}>
          <Credits
            display={this.state.display}
            dataCredits={this.state.dataCredits}
            handlerCloseCredits={this.handlerCloseCredits}
            language={this.state.currentLanguage}
           />
        </div>
        <div id="container-poll"
          className={this.state.display !== 'poll' ? 'hide' : ''}>
          <Poll
            parsedDataPoll={this.state.parsedDataPoll}
            parsedDataPollOptions={this.state.parsedDataPollOptions}
            dataReady={this.state.dataReady}
            language={this._getLanguageName(this.state.currentLanguage)}
            handlerClosePoll={this.handlerClosePoll}
            handlerInteractPoll={this.handlerInteractPoll}
           />
        </div>
        <div id="container-main"
          className={this.state.display === 'main' ? 'show' : ''}>
          <Main
            parsedDataBasics={this.state.parsedDataBasics}
            parsedDataPersons={this.state.parsedDataPersons}
            dataReady={this.state.dataReady}
            language={this._getLanguageName(this.state.currentLanguage)}
            activePerson={this.state.activePerson}
            activePersonSwitch={this.state.activePersonSwitch}
            currentYear={this.state.currentYear}
            handlerSelectPerson={this.handlerSelectPerson}
            handlerDeselectPerson={this.handlerDeselectPerson}
            handlerSelectYear={this.handlerSelectYear}
            handlerOpenPoll={this.handlerOpenPoll}
          />
        </div>
      </div>
    )
  }
}

export default App
