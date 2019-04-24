import React, {Component} from 'react'
import '../style/Translator.css'

class Translator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLanguage: null
    }
  }

  componentWillReceiveProps(nextProps) {
    var language = nextProps.language
    this.setState({
      currentLanguage: language
    })
  }

  render() {
    return(
      <div id="translator">
        <button
          className={this.props.display === 'credits' ? 'credits active' : 'credits'}
          onTouchEnd={(e) => this.props.handlerOpenCredits(e)}
          onClick={(e) => this.props.handlerOpenCredits(e)}
          ><span>Credits</span></button>
        <button
          className={this.state.currentLanguage === 'tl' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'tl')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'tl')}
          ><span>Filipino</span></button>
        <button
          className={this.state.currentLanguage === 'zh' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'zh')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'zh')}
          ><span>繁体中文</span></button>
        <button
          className={this.state.currentLanguage === 'es' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'es')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'es')}
          ><span>Español</span></button>
        <button
          className={this.state.currentLanguage === 'en' ? 'active' : ''}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'en')}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'en')}
          ><span>English</span></button>
      </div>
    )
  }
}

export default Translator
