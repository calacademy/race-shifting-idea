import React, {Component} from 'react'
import '../style/Credits.css'

class Credits extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.display !== 'credits') {
      var scroll = document.getElementById('credits-scroll-container')
      scroll.scrollTop = 0
    }
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
          onTouchEnd={(e) => this.props.handlerCloseCredits(e)}
          onClick={(e) => this.props.handlerCloseCredits(e)}
        />
        <div id="credits-scroll-container">
          <h1>Credits</h1>
          <ul>
            {rows}
          </ul>
          <div id="credits-mask" />
        </div>
      </div>
    )
  }
}

export default Credits
