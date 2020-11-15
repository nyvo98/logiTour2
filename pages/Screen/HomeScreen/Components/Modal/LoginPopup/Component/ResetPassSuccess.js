import React from 'react'
import '../styles.scss'
import MyButton from 'pages/Components/MyButton'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import * as Images from 'config/images'
import { validatePw, getLength, showNotification } from 'common/function'
import ReduxServices from 'common/redux'
import BaseAPI from 'controller/API/BaseAPI'

class ResetPassSuccess extends React.PureComponent {
  onChangeEmailInput = ({ target }) => {
    this.setState({ txtEmail: target.value })
  };

  onChangePasswordInput = ({ target }) => {
    let stateUpdate = { txtPw: target.value }

    stateUpdate.isContainNum = validatePw(target.value)

    stateUpdate.isOkLength = getLength(target.value) > 8

    this.setState(stateUpdate)
  };

  onRouterSignup = () => {
    this.setState({ isSignup: true })
  };

  onRouterSignupInfor=async () => {
    const { onChangeRouter } = this.props
    const { messages } = this.props.locale
    const { txtEmail, txtPw } = this.state
    const resLogin = await BaseAPI.postData('user/reg/pw', {
      email: txtEmail,
      password: txtPw
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(messages.loginFail, messages.userExisted || '')
      } else {
        ReduxServices.loginUser(resLogin)
        onChangeRouter('info')()
      }
    }
  }

  renderError = () => {
    const { isOkLength, isContainNum } = this.state
    const { messages } = this.props.locale
    return (
      <React.Fragment>
        <p
          className={`-or-more-characters ${isOkLength ? 'check' : 'uncheck'}`}>
          <img src={Images.images[isOkLength ? 'greenCheck' : 'grayCheck']} className='ic_check_a' />
          {messages.isOKLength || ''}
        </p>
        <p className={`At-least-one-number ${isContainNum ? 'check' : 'uncheck'}`}>
          <img src={Images.images[isContainNum ? 'greenCheck' : 'grayCheck']} className='ic_check_d' />
          {messages.isContainNum || ''}
        </p>
      </React.Fragment>
    )
  };
  onCloseModal=() => {
    const { closeModal } = this.props
    closeModal()
  }
  onFinish = async values => {
    console.log(values)
    // const resContactus = await BaseAPI.postData('contactUs', values)
    // if (resContactus) {
    //   if (resContactus.errMess) {
    //     showNotification('Send fail', 'Please check form again')
    //   } else {
    //     showNotification('Thank you for your post our team will endeavor to respond your queries within 1-2 working days')
    //     this.props.closeModal()
    //   }
    // }
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  };

  render () {
    const { messages } = this.props.locale

    return (
      <div className='reset-pw-container login-responsive'>
        <p className='reset-pw-success'>{messages.emailSendCompleted || ''}</p>
        <img src={Images.images.icCheck} />
        <p className='MB40 explain-success'>{messages.showMessage || ''}</p>
        <Button
          className='form-reset-pw__button-custom'
          onClick={this.onCloseModal}
        >
          {messages.confirm || ''}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps, null)(ResetPassSuccess)
