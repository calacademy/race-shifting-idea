import React, {Component} from 'react'
import '../style/Poll.css'

class Poll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counts: [0,0,0,0], // assumes 4 poll counts
      total: 0,
      submitted: false,
      results: [  // assumes 4 poll options
        {
          percentage: '0',
          count: '0'
        },
        {
          percentage: '0',
          count: '0'
        },
        {
          percentage: '0',
          count: '0'
        },
        {
          percentage: '0',
          count: '0'
        }
      ]
    }

  }

  _submitPoll() {
    if (this.props.option !== null) {
      let o = this.props.option
      let c = parseInt(this.state.counts[o]) + 1
      localStorage["count" + o] = c
      let r = this._getTalliedResults()
      let t = this._getTotal()
      this.setState({
        counts: [
          localStorage["count0"],
          localStorage["count1"],
          localStorage["count2"],
          localStorage["count3"]
        ],
        submitted: true,
        results: r,
        total: t
      })
      this.props.handlerInteractPoll()
    }
  }

  _getTotal() {
    let c = [
      parseInt(localStorage["count0"]),
      parseInt(localStorage["count1"]),
      parseInt(localStorage["count2"]),
      parseInt(localStorage["count3"])
    ]
    return (c[0] + c[1] + c[2] + c[3])
  }

  _getTalliedResults() {
    let totalCount = 0
    let c = [
      parseInt(localStorage["count0"]),
      parseInt(localStorage["count1"]),
      parseInt(localStorage["count2"]),
      parseInt(localStorage["count3"])
    ]
    totalCount = c[0] + c[1] + c[2] + c[3]
    let fl = [
      c[0] / totalCount,
      c[1] / totalCount,
      c[2] / totalCount,
      c[3] / totalCount
    ]
    let p = [
      Math.round(fl[0] * 100),
      Math.round(fl[1] * 100),
      Math.round(fl[2] * 100),
      Math.round(fl[3] * 100)
    ]
    // make sure rounded percentages sum 100
    // unless results include 33, 33, 33
    let thirds = p.filter((item) => {
      return item === 33
    })
    if (thirds.length !== 3) {
      let sum = p.reduce((a, b) => {
        return a + b
      })
      let diff = 100 - sum
      let g = fl.reduce((m, x, i, a) => {
        return ((x * 100) - Math.floor(x * 100)) > ((a[m] * 100) - Math.floor(a[m] * 100)) ? i : m
      }, 0)
      if (diff > 0) {
        p[g] = p[g] + 1
      } else if (diff < 0) {
        p[g] = p[g] - 1
      }
    }

    let arr = [
      {
        percentage: p[0],
        count: c[0]
      },
      {
        percentage: p[1],
        count: c[1]
      },
      {
        percentage: p[2],
        count: c[2]
      },
      {
        percentage: p[3],
        count: c[3]
      }
    ]
    return arr

  }

  _exitPoll() {
    this.setState({
      submitted: false
    })
    this.props.handlerClosePoll()
  }

  _selectOption(e, i) {
    if (this.state.submitted === false) {
      e.preventDefault()
      this.props.handlerInteractPoll(i)
    }
  }

  componentDidMount() {
    if (!(localStorage["count0"])) {
      localStorage["count0"] = 0
    }
    if (!(localStorage["count1"])) {
      localStorage["count1"] = 0
    }
    if (!(localStorage["count2"])) {
      localStorage["count2"] = 0
    }
    if (!(localStorage["count3"])) {
      localStorage["count3"] = 0
    }
    this.setState({
      counts: [
        localStorage["count0"],
        localStorage["count1"],
        localStorage["count2"],
        localStorage["count3"]
      ]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.option !== this.props.option) {
      if (!this.props.option) {
        this.setState({
          submitted: false
        })
      }
    }
  }

  render() {

    const _this = this

    let markupHeaderEyebrow = {__html: ''}
    let markupHeader = {__html: ''}
    let markupDescription = {__html: ''}
    let markupChooseHeader = {__html: ''}
    let markupQuestion = {__html: ''}

    let markupProLabel = {__html: ''}
    let markupConLabel = {__html: ''}

    let markupSubmitButtonLabel = {__html: ''}
    let markupCompleted = {__html: ''}

    let options = []

    if (this.props.dataReady) {

      markupHeaderEyebrow = {__html: this.props.parsedDataPoll.headerEyebrow[0][this.props.language]['#markup']}
      markupHeader = {__html: this.props.parsedDataPoll.header[0][this.props.language]['#markup']}
      markupDescription = {__html: this.props.parsedDataPoll.description[0][this.props.language]['#markup']}
      markupChooseHeader = {__html: this.props.parsedDataPoll.chooseHeader[0][this.props.language]['#markup']}
      markupQuestion = {__html: this.props.parsedDataPoll.question[0][this.props.language]['#markup']}
      markupProLabel = {__html: this.props.parsedDataPoll.proLabel[0][this.props.language]['#markup'] + ':'}
      markupConLabel = {__html: this.props.parsedDataPoll.conLabel[0][this.props.language]['#markup'] + ':'}
      markupSubmitButtonLabel = {__html: this.props.parsedDataPoll.submitButtonLabel[0][this.props.language]['#markup']}
      markupCompleted = {__html: this.props.parsedDataPoll.completedLabel[0][this.props.language]['#markup'] + ': ' + this.state.total}

      this.props.parsedDataPollOptions.forEach((item, i) => {

        let markupLabel = {__html: ''}
        let markupAnswer = {__html: ''}
        let markupPro = {__html: ''}
        let markupCon = {__html: ''}

        let markupResultPercentage = {__html: ''}
        let markupResultCount = {__html: ''}

        markupLabel = {__html: this.props.parsedDataPollOptions[i].label[0][this.props.language]['#markup']}
        markupAnswer = {__html: this.props.parsedDataPollOptions[i].answer[0][this.props.language]['#markup']}
        markupPro = {__html: this.props.parsedDataPollOptions[i].pro[0][this.props.language]['#markup']}
        markupCon = {__html: this.props.parsedDataPollOptions[i].con[0][this.props.language]['#markup']}

        markupResultPercentage = {__html: this.state.results[i].percentage + '%'}
        markupResultCount = {__html: this.props.parsedDataPoll.responsesLabel[0][this.props.language]['#markup'] + ': ' + this.state.results[i].count}

        let barStyle = { width: this.state.results[i].percentage * 7.65 }

        options.push(
          <div key={"poll-option-" + i} id={"poll-option-" + i} className="poll-option">
            <div
              id={"pro-and-con-" + i}
              className={(!(_this.state.submitted) && _this.props.option === i) ? 'pro-and-con' : 'pro-and-con hide'}
              >
              <div className="pro-con-tail" />
              <h1
                dangerouslySetInnerHTML={markupProLabel}
              />
              <p
                dangerouslySetInnerHTML={markupPro}
              />
              <h1
                dangerouslySetInnerHTML={markupConLabel}
              />
              <p
                dangerouslySetInnerHTML={markupCon}
              />
            </div>

            <div
              id={"poll-result-" + i}
              className={_this.state.submitted ? 'poll-result show' : 'poll-result'}
            >
              <h1
                dangerouslySetInnerHTML={markupResultPercentage}
              />
              <h2
                dangerouslySetInnerHTML={markupResultCount}
              />
            </div>

            <div
              className={_this.props.option === i ? 'checkbox on' : 'checkbox'}
              onTouchEnd={(e) => _this._selectOption(e, i)}
              onClick={(e) => _this._selectOption(e, i)}
            />
            <div className="option-text">
              <div className="option-label"
                dangerouslySetInnerHTML={markupLabel}
              />
              <div className="answer"
                dangerouslySetInnerHTML={markupAnswer}
              />
              <div className="poll-bar">
                <div
                  id={'poll-bar-fill-' + i}
                  className={_this.state.submitted ? 'poll-bar-fill' : 'poll-bar-fill hide'}
                  style={barStyle}
                />
                <div className="poll-bar-sec" />
                <div className="poll-bar-sec" />
                <div className="poll-bar-sec" />
                <div className="poll-bar-sec" />
              </div>
            </div>


          </div>
        )

      })

    }

    return(
      <div id="poll">
        <div id="poll-frame">
          <button
            id="poll-button-close"
            onTouchEnd={(e) => this._exitPoll(e)}
            onClick={(e) => this._exitPoll(e)}
          />
          <div className="poll-column" id="poll-column-left">
            <h1
              dangerouslySetInnerHTML={markupHeaderEyebrow}
            />
            <h2
              dangerouslySetInnerHTML={markupHeader}
            />
            <p
              dangerouslySetInnerHTML={markupDescription}
            />
            <div id="poll-image" />
          </div>
          <div className="poll-column" id="poll-column-right">
            <div id="poll-options-header">
              <h1
                dangerouslySetInnerHTML={markupChooseHeader}
              />
              <h2
                dangerouslySetInnerHTML={markupQuestion}
              />
            </div>
            <div id="poll-options">
              {options}
            </div>

            <div id="poll-options-footer">
              <div id="poll-total-results"
                className={this.state.submitted ? '' : 'hide'}
                dangerouslySetInnerHTML={markupCompleted}
              />
              <div
                className={this.state.submitted ? 'hide' : ''}
                id="poll-button-container">
                <button
                  className={this.props.option !== null ? '' : 'off'}
                  id="poll-button-submit"
                  onTouchEnd={(e) => this._submitPoll(e)}
                  onClick={(e) => this._submitPoll(e)}
                >
                  <span dangerouslySetInnerHTML={markupSubmitButtonLabel} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Poll
