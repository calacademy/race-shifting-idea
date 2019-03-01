import React, {Component} from 'react'
import '../style/Loader.css'

class Loader extends Component {

  componentDidUpdate(prevProps, prevState) {
    var _this = this
    if (this.props.dataReady !== prevProps.dataReady) {
      setTimeout(function() {
        _this.props.handlerLoadComplete()
      }, 10000)
    }
  }

  render() {

    if (this.props.dataReady) {

      const rows = []

      rows.push(
        <div key="0" id="loader-source-images">

          <div id="people-0-a" />
          <div id="people-0-b" />
          <div id="people-0-c" />

          <div id="people-1-a" />
          <div id="people-1-b" />
          <div id="people-1-c" />

          <div id="people-2-a" />
          <div id="people-2-b" />
          <div id="people-2-c" />

          <div id="people-3-a" />
          <div id="people-3-b" />
          <div id="people-3-c" />

          <div id="people-4-a" />
          <div id="people-4-b" />
          <div id="people-4-c" />

          <div id="people-5-a" />
          <div id="people-5-b" />
          <div id="people-5-c" />

          <div id="people-6-a" />
          <div id="people-6-b" />
          <div id="people-6-c" />

        </div>
      )

      return(
        <div id="loader">
          <div id="asset-container">
            {rows}
            <p className="a">Test123!@#</p>
            <p className="b">Test123!@#</p>
            <p className="c">Test123!@#</p>
            <p className="d">Test123!@#</p>
            <p className="e">Test123!@#</p>
            <p className="f">Test123!@#</p>
            <p className="g">Test123!@#</p>
            <p className="h">Test123!@#</p>
            <p className="i">測試中文字體</p>
            <p className="j">測試中文字體</p>
            <p className="k">測試中文字體</p>
          </div>
          <div id="message-container">
            <p>This exhibit is being updated.</p>
          </div>
        </div>
      )

    } else {

      return(
        <div id="loader">
          <div id="message-container">
            <p>This exhibit is being updated.</p>
          </div>
        </div>
      )

    }

  }

}

export default Loader
