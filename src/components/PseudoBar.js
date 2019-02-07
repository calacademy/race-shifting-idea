import React, {Component} from 'react'
import '../style/PseudoBar.css'

class PseudoBar extends Component {

  _selectPerson(e, i) {
    e.preventDefault()
    this.props.handlerSelectPerson(i)
  }

  render() {

    return(
      <div id="pseudo-bar">
        <div
          id="pseudo-bar-tab-person-0"
          onTouchEnd={(e) => this._selectPerson(e, 0)}
          onClick={(e) => this._selectPerson(e, 0)}
        />
        <div
          id="pseudo-bar-tab-person-1"
          onTouchEnd={(e) => this._selectPerson(e, 1)}
          onClick={(e) => this._selectPerson(e, 1)}
        />
        <div
          id="pseudo-bar-tab-person-2"
          onTouchEnd={(e) => this._selectPerson(e, 2)}
          onClick={(e) => this._selectPerson(e, 2)}
        />
        <div
          id="pseudo-bar-tab-person-3"
          onTouchEnd={(e) => this._selectPerson(e, 3)}
          onClick={(e) => this._selectPerson(e, 3)}
        />
        <div
          id="pseudo-bar-tab-person-4"
          onTouchEnd={(e) => this._selectPerson(e, 4)}
          onClick={(e) => this._selectPerson(e, 4)}
        />
        <div
          id="pseudo-bar-tab-person-5"
          onTouchEnd={(e) => this._selectPerson(e, 5)}
          onClick={(e) => this._selectPerson(e, 5)}
        />
        <div
          id="pseudo-bar-tab-person-6"
          onTouchEnd={(e) => this._selectPerson(e, 6)}
          onClick={(e) => this._selectPerson(e, 6)}
        />
      </div>
    )

  }

}

export default PseudoBar
