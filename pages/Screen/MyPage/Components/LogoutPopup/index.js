import React, { Component } from 'react'
import './style.scss'
import MyButton from 'pages/Components/MyButton'
import ReduxService from 'common/redux'
import { Router } from 'common/routes'
import { connect } from 'react-redux'
class LogoutPopup extends Component {
  onConfirmLogout = () => {
    Router.pushRoute('/')
    ReduxService.resetReduxData()
  }
  render () {
    const { messages } = this.props.locale
    return (
      <div className='logout-popup'>
        <p className='logout-popup__title heading heading--main'>{messages.logOut || ''}</p>
        <p className='logout-popup__content'>
          {messages.AreYouSureYouWantToLogOut || ''}
          <br />
          {messages.confirmToLogout || ''}
        </p>
        <div className='logout-popup__buttonContainer'>
          <MyButton title={messages.confirm || ''} isFullWidth onClick={this.onConfirmLogout} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ locale: state.locale })

export default connect(mapStateToProps)(LogoutPopup)
