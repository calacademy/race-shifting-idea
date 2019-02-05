import React, {Component} from 'react'

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this._listenForSvgClick()
    this._listenForSvgUnclick()
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.activePerson !== this.props.activePerson) && (this.props.activePerson !== null)) {
      this._showActivePersonDeselectMask()
      this._hideActivePersonSelectMask()
    } else if ((prevProps.activePerson !== this.props.activePerson) && (this.props.activePerson === null)) {
      this._hideAllPersonDeselectMasks()
      this._showAllPersonSelectMasks()
    }
  }

  _listenForSvgClick() {
    const _this = this
    let mask = document.getElementById("object-people-mask")
    mask.addEventListener("load", function() {
      let svgDoc = mask.contentDocument
      let svgPaths = svgDoc.getElementsByClassName("click-path")
      for (let i=0; i < svgPaths.length; i++) {
        svgPaths[i].addEventListener("mousedown", function() {
          let x = i
          switch(i) {
            case 0:
              x = 6
              break
            case 1:
              x = 1
              break
            case 2:
              x = 3
              break
            case 3:
              x = 5
              break
            case 4:
              x = 0
              break
            case 5:
              x = 2
              break
            case 6:
              x = 4
              break
          }
          _this._hideAllPersonDeselectMasks()
          _this.props.handlerSelectPerson(x)
          _this._showAllOtherPersonSelectMasks(x)
        }, false)
      }
    }, false)
  }

  _listenForSvgUnclick() {
    const _this = this
    let mask = document.getElementById("object-people-mask")
    mask.addEventListener("load", function() {
      let svgDoc = mask.contentDocument
      let svgPaths = svgDoc.getElementsByClassName("unclick-path")
      for (let i=0; i < svgPaths.length; i++) {
        svgPaths[i].addEventListener("mousedown", function() {
          let x = i
          switch(i) {
            case 0:
              x = 6
              break
            case 1:
              x = 1
              break
            case 2:
              x = 3
              break
            case 3:
              x = 5
              break
            case 4:
              x = 0
              break
            case 5:
              x = 2
              break
            case 6:
              x = 4
              break
          }
          _this.props.handlerDeselectPerson(x)
          _this._hidePersonDeselectMask(x)
          _this._showPersonSelectMask(x)
        }, false)
      }
    }, false)
  }

  _hidePersonDeselectMask(i) {
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPath = svgDoc.getElementById("svg-person-" + i + "-on")
    svgPath.style.display = 'none'
  }

  _showPersonSelectMask(i) {
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPath = svgDoc.getElementById("svg-person-" + i + "-off")
    svgPath.style.display = 'inline'
  }

  _hideAllPersonDeselectMasks() {
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPaths = svgDoc.getElementsByClassName("unclick-path")
    for (let i=0; i < svgPaths.length; i++) {
      svgPaths[i].style.display = 'none'
    }
  }

  _showAllPersonSelectMasks() {
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPaths = svgDoc.getElementsByClassName("click-path")
    for (let i=0; i < svgPaths.length; i++) {
      svgPaths[i].style.display = 'inline'
    }
  }

  _showAllOtherPersonSelectMasks(p) {
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPaths = svgDoc.getElementsByClassName("click-path")
    for (let i=0; i < svgPaths.length; i++) {
      if (i !== p) {
        svgPaths[i].style.display = 'inline'
      }
    }
  }

  _showActivePersonDeselectMask() {
    const _this = this
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPath = svgDoc.getElementById("svg-person-" + _this.props.activePerson + "-on")
    svgPath.style.display = 'inline'
  }

  _hideActivePersonSelectMask() {
    const _this = this
    let mask = document.getElementById("object-people-mask")
    let svgDoc = mask.contentDocument
    let svgPath = svgDoc.getElementById("svg-person-" + _this.props.activePerson + "-off")
    svgPath.style.display = 'none'
  }

  render() {
    return(
      <div id="people">
        <object
          id="object-people-mask"
          data={"../img/people/people.svg"}
          type="image/svg+xml"
          >
          object placeholder text
        </object>
      </div>
    )
  }
}

export default People
