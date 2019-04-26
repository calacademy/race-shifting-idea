import React, {Component} from 'react'
import '../style/Credits.css'

class Credits extends Component {

  constructor() {
    super()
    this.state = {
      scrollActive: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      var scroll = document.getElementById('credits-scroll-container')
      scroll.scrollTop = 0
    }
  }

  _initScroll() {
    var scroll = document.getElementById('credits-scroll-container')
    if (scroll.scrollTop === 0) {
      this.setState({
        scrollActive: false
      })
    } else {
      this.setState({
        scrollActive: true
      })
    }
    this.props.handlerScrollCredits()
  }

  render() {

    const rows = []

    if (this.props.dataCredits) {

      var _this = this

      var header = ''
      var desc = ''
      var markupDesc = {__html: ''}

      this.props.dataCredits.forEach(function(cred, i) {

        header = cred['title_' + _this.props.language]
        desc = cred['subheader_' + _this.props.language]
        desc = desc.replace(/<\/?a[^>]*>/g, "")
        markupDesc = {__html: desc}

        rows.push(
          <li
            key={i}
            >
              <h2>{header}</h2>
              <p dangerouslySetInnerHTML={markupDesc} />
            </li>
        )
      })

    }

    return(
      <div id="credits">
        <button
          onTouchEnd={() => this.props.handlerCloseCredits()}
          onClick={() => this.props.handlerCloseCredits()}
        />
        <div
          id="credits-scroll-container"
          onTouchMove={() => this._initScroll()}
          onScroll={() => this._initScroll()}
          >
          <div
            id="credits-mask-top"
            className={(!this.state.scrollActive) ? 'hide' : ''}
          />
          <h1>Credits</h1>
          <ul>
            {rows}
          </ul>
          <div id="credits-mask-bottom" />
        </div>
      </div>
    )
  }
}

export default Credits
