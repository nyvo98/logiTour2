import React from 'react'
import '../styles.scss'
import MyButton from 'pages/Components/MyButton'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import * as Images from 'config/images'
import { validatePw, getLength, showNotification } from 'common/function'
import ReduxServices from 'common/redux'
import BaseAPI from 'controller/API/BaseAPI'

class ResetPassPopup extends React.PureComponent {
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
        showNotification(messages.loginFail || '', messages.userExisted || '')
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
  }

  onFinish = async values => {
    console.log(values)
    const { onChangeRouter } = this.props

    const resContactus = await BaseAPI.postData('user/pwReset', values)
    if (resContactus) {
      onChangeRouter('resetPassSuccess')()
    }
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  render () {
    const { messages } = this.props.locale

    return (
      <div className='reset-pw-container login-responsive'>
        <p className='reset-pw'>{messages.resetPass || ''}</p>
        <p className='explain'>{messages.resetPassExplain || ''}</p>
        <Form onFinish={this.onFinish} className='form-reset-pw'
          onFinishFailed={this.onFinishFailed}>
          <p>{messages.email}</p>
          <div className='form-email'>
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: `${messages.enterValidEmail || ''}`
                },
                {
                  required: true,
                  message: `${messages.inputEmail || ''}`
                }
              ]}
            >
              <Input
                className='input-box information_input'
                placeholder={`${messages.emailAddr}`}
              />
            </Form.Item>
          </div>
          <Button
            htmlType='submit'
            className='MT20 form-reset-pw__button-custom'

          >
            {messages.send || ''}
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps, null)(ResetPassPopup)
