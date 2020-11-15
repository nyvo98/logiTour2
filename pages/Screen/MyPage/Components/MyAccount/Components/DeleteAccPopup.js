import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from 'config/images'
import MyButton from 'pages/Components/MyButton'

class DeleteAccPopup extends Component {
  render () {
    const { messages } = this.props.locale
    return (
      <div className='deleteAccPopup'>
        <p className='heading heading--main deleteAccPopup_title'>{messages.deleteAcc || ''}</p>
        <img className='deleteAccPopup_icon' src={images.trashIcon} />
        <p className='deleteAccPopup_question'>
          {messages.deleteAccDetail || ''}
        </p>
        <div style={{ width: '100%' }} className='MT30'>
          <MyButton title={messages.confirm || ''} isFullWidth />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps, null)(DeleteAccPopup)
