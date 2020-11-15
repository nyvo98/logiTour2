import React, { Component } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { getNameObject } from 'common/function'

class TermServices extends Component {
  render () {
    const { settingRedux, locale } = this.props
    const { messages } = this.props.locale

    const termText = getNameObject(settingRedux.termOfService, locale.lang)

    const addLineBreaks = string =>
      string.split('\n').map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
          {text}
          <br />
        </React.Fragment>
      ))

    return (
      <div className='term-container container'>
        <h2 className='heading heading--main MB24'>{messages.termConditions}</h2>
        <div className='term-content'>
          {addLineBreaks(termText)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  settingRedux: state.settingRedux
})

export default connect(mapStateToProps)(TermServices)
