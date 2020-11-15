import React from 'react'
import '../styles.scss'
import MyButton from 'pages/Components/MyButton'
import { connect } from 'react-redux'
import { Form, Input } from 'antd'
import { GoogleLogin, useGoogleLogin } from 'react-google-login'
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons'
import { validatePw, getLength, showNotification } from 'common/function'
import ReduxServices from 'common/redux'
import BaseAPI from 'controller/API/BaseAPI'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { images } from 'config/images'

class SignupPopup extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isSignup: false,
      txtEmail: '',
      txtPw: '',
      isOkLength: false,
      isContainNum: false,
      isComplete: false,
      isLoading: false
    }

    this.form = React.createRef()
  }
  onChangeEmailInput = ({ target }) => {
    this.setState({ txtEmail: target.value })
  };

  onChangePasswordInput = ({ target }) => {
    let stateUpdate = { txtPw: target.value }

    stateUpdate.isContainNum = validatePw(target.value)

    stateUpdate.isOkLength = getLength(target.value) >= 8

    this.setState(stateUpdate)
  };

  onRouterSignup = () => {
    this.setState({ isSignup: true })
  };

  onRouterSignupInfor=async () => {
    const { onChangeRouter, callback } = this.props
    const { messages } = this.props.locale
    const { txtEmail, txtPw } = this.state
    this.setState({ isLoading: true })
    const resLogin = await BaseAPI.postData('user/reg/pw', {
      email: txtEmail,
      password: txtPw
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(messages.loginFail || '', messages.userExisted || '')
      } else {
        callback && callback(resLogin.data.id)
        // ReduxServices.loginUser(resLogin)
        onChangeRouter('info')()
      }
    }
    this.setState({ isLoading: true })
  }

  renderError = () => {
    const { isOkLength, isContainNum } = this.state
    const { messages } = this.props.locale
    return (
      <React.Fragment>
        <p
          className={`-or-more-characters ${isOkLength ? 'check' : 'uncheck'}`}>
          <img src={images[isOkLength ? 'greenCheck' : 'grayCheck']} className='ic_check_a' />
          {messages.isOKLength || ''}
        </p>
        <p className={`At-least-one-number ${isContainNum ? 'check' : 'uncheck'}`}>
          <img src={images[isContainNum ? 'greenCheck' : 'grayCheck']} className='ic_check_d' />
          {messages.isContainNum || ''}
        </p>
      </React.Fragment>
    )
  };
  onGoogleLogin = async (res) => {
    const { messages } = this.props.locale
    const { closeModal } = this.props
    const resLogin = await BaseAPI.postData('user/reg/gg', {
      token: res.accessToken
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(messages.loginFail || '', messages.invalideEmailPW || '')
      } else {
        ReduxServices.loginUser(resLogin)
        closeModal()
      }
    }
  }

  onFacebookLogin = async res => {
    const { messages } = this.props.locale
    const { closeModal } = this.props
    const resLogin = await BaseAPI.postData('user/reg/fb', {
      token: res.accessToken
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(
          messages.loginFail || '',
          messages.invalideEmailPW || ''
        )
      } else {
        ReduxServices.loginUser(resLogin)
        closeModal()
      }
    }
  };

  onFailure = (res) => {
    console.log(res)
    const { messages } = this.props.locale
    showNotification(messages.loginFail || '', messages.invalideEmailPW || '')
  }

  LoginSocialBox = () => {
    const { messages } = this.props.locale
    return (
      <div className=' login-social-box-margin login-social-box'>
        <p className='continue-with  MB30'>{messages.signWith || ''}</p>
        <div className='social-icon-group'>
          <GoogleLogin
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <div className='ic ic--gg' onClick={renderProps.onClick}>
                <img src={images.icGoogle} alt='Google Icon' />
              </div>
            )}
            onFailure={this.onFailure}
            onSuccess={this.onGoogleLogin}
            clientId='213521929740-umtl80944k5lsqtft8cmg3tlmd6kbs9f.apps.googleusercontent.com'
          />
          <FacebookLogin
            callback={this.onFacebookLogin}
            appId='142085383903485'
            render={renderProps => (
              <div className='ic ic--fb' onClick={renderProps.onClick}>
                <img src={images.icFb} alt='Facebook Icon' />
              </div>
            )}
          />
        </div>
        <div className='white-line' />
      </div>
    )
  }

  handleSubmitForm = (event) => {
    if (event.keyCode) { return event.keyCode === 13 && this.form.current.submit() }

    return this.form.current.submit()
  }
  render () {
    const { txtEmail, txtPw, isLoading } = this.state
    const { messages } = this.props.locale
    const { onChangeRouter } = this.props
    const {
      onChangeEmailInput,
      onChangePasswordInput,
      renderError
    } = this
    const validateMessages = {
      required: `${messages.fieldIsRequired || ''}`,
      types: {
        email: `${messages.isEmail || ''}`
      }
    }

    return (
      <div className='LoginContainer login-responsive'>
        <Form
          className='test'
          validateMessages={validateMessages}
          ref={this.form}
          onKeyDown={this.handleSubmitForm}
          onFinish={this.onRouterSignupInfor}
        >
          <p className='Log-in'>{messages.signup || ''}</p>
          <div className='input-container'>
            <p className='input-title'>{messages.email}</p>

            <Form.Item name='email' rules={[{ required: true, type: 'email' }]}>
              <Input
                className='input-box'
                onChange={onChangeEmailInput}
                name='email'
                value={txtEmail}
                placeholder={`${messages.enterEmail} *`}
              />
            </Form.Item>
          </div>
          <div className='input-container'>
            <p className='input-title'>{messages.password || ''}</p>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: `${messages.enterPassword || ''}` }
              ]}
            >
              <Input.Password
                className='input-box'
                onChange={onChangePasswordInput}
                name='password'
                value={txtPw}
                placeholder={`${messages.enterPass || ''} *`}
              />
            </Form.Item>
          </div>
          <p className='Please-enter-accordi'>
            {messages.enterConditions || ''}
          </p>
          <div style={{ width: '100%' }}>{renderError()}</div>
          <MyButton
            onClick={this.handleSubmitForm}
            isFullWidth
            className='login-button-txt MT20 MB30'
            title={messages.next || ''}
            isLoading={isLoading}
          />
        </Form>
        <div className='socialBox'>
          <this.LoginSocialBox />
          <div className='sign-up-row'>
            <p className='new-here-txt'>{messages.haveAcc || ''}</p>
            <p onClick={onChangeRouter('login')} className='sign-up-txt'>
              {messages.login || ''}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps, null)(SignupPopup)
