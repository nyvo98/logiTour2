import React from 'react'
import './styles.scss'
import SignupPopup from './Component/SignupPopup'
import { connect } from 'react-redux'
import MyButton from 'pages/Components/MyButton'
import { Form, Input } from 'antd'
import { showNotification } from 'common/function'
import BaseAPI from 'controller/API/BaseAPI'
import ReduxServices from 'common/redux'
import SignupInforPage from './Component/SignupInforPage'
import ResetPassPopup from './Component/ResetPassPopup'
import ResetPassSuccess from './Component/ResetPassSuccess'
import { GoogleLogin } from 'react-google-login'
import { images } from 'config/images'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import VerifyEmail from './Component/VerifyEmail'

class LoginPopup extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      stateRouter: 'login',
      txtEmail: '',
      txtPw: '',
      isLoading: false,
      isCaplock: false,
    }

    this.form = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.getModifierState) {
        this.setState((state) => ({
          ...state,
          isCaplock: !!e.getModifierState('CapsLock'),
        }))
      }
    })
  }

  onChangeEmailInput = ({ target }) => {
    this.setState({ txtEmail: target.value })
  }

  onChangePasswordInput = ({ target }) => {
    this.setState({ txtPw: target.value })
  }

  onLogin = async () => {
    this.setState({ isLoading: true })
    const { messages } = this.props.locale
    const { closeModal } = this.props
    const { txtEmail, txtPw } = this.state
    const resLogin = await BaseAPI.postData('user/reg/pw', {
      isLogin: true,
      email: txtEmail,
      password: txtPw,
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(
          messages.loginFail || '',
          messages[resLogin.errMess] || '',
          'error'
        )
      } else {
        ReduxServices.loginUser(resLogin)
        closeModal()
      }
    }
    this.setState({ isLoading: false })
  }

  onFacebookLogin = async (res) => {
    const { messages } = this.props.locale
    const { closeModal } = this.props
    const resLogin = await BaseAPI.postData('user/reg/fb', {
      token: res.accessToken,
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(
          messages.loginFail || '',
          messages[resLogin.errMess] || '',
          'error'
        )
      } else {
        ReduxServices.loginUser(resLogin)
        closeModal()
      }
    }
  }
  onGoogleLogin = async (res) => {
    const { messages } = this.props.locale
    const { closeModal } = this.props
    const resLogin = await BaseAPI.postData('user/reg/gg', {
      token: res.accessToken,
    })
    if (resLogin) {
      if (resLogin.errMess) {
        showNotification(
          messages.loginFail || '',
          messages[resLogin.errMess] || '',
          'error'
        )
      } else {
        ReduxServices.loginUser(resLogin)
        closeModal()
      }
    }
  }

  onFailure = (res) => {
    console.log(res)
    if (
      res.error !== 'idpiframe_initialization_failed' &&
      res.error !== 'popup_closed_by_user'
    ) {
      const { messages } = this.props.locale
      showNotification(
        messages.loginFail || '',
        messages[resLogin.errMess] || '',
        'error'
      )
    }
  }

  loginSocialBox = () => {
    const { messages } = this.props.locale
    return (
      <div className=" login-social-box-margin login-social-box">
        <div className="continue-with  MB30">{messages.loginWith}</div>
        <div className="social-icon-group">
          <GoogleLogin
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <div className="ic ic--gg" onClick={renderProps.onClick}>
                <img src={images.icGoogle} alt="Google Icon" />
              </div>
            )}
            onFailure={this.onFailure}
            onSuccess={this.onGoogleLogin}
            clientId="1056733066341-26eumskpcf88747080o4fmeke250utnd.apps.googleusercontent.com"
          />
          {/* <FacebookLogin
            callback={this.onFacebookLogin}
            appId="807632626624249"
            render={(renderProps) => (
              <div className="ic ic--fb" onClick={renderProps.onClick}>
                <img src={images.icFb} alt="Facebook Icon" />
              </div>
            )}
          /> */}
        </div>
        <div className="white-line" />
      </div>
    )
  }

  handleSubmitForm = (event) => {
    if (event.keyCode) {
      return event.keyCode === 13 && this.form.current.submit()
    }

    return this.form.current.submit()
  }

  LoginForm = () => {
    const { txtEmail, txtPw, isLoading, isCaplock } = this.state
    const { messages } = this.props.locale

    const validateMessages = {
      required: `${messages.fieldIsRequired || ''}`,
      types: {
        email: `${messages.isEmail || ''}`,
      },
    }

    return (
      <div className="LoginContainer login-responsive">
        <Form
          className="test"
          ref={this.form}
          validateMessages={validateMessages}
          onFinish={this.onLogin}
          onKeyDown={this.handleSubmitForm}
        >
          {/* <p className='Log-in'>{messages.login || ''}</p> */}
          <p className="Log-in">{messages.log_in}</p>
          <div className="input-container">
            <p className="input-title">{messages.email}</p>

            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input
                className="input-box"
                onChange={this.onChangeEmailInput}
                name="email"
                value={txtEmail}
                placeholder={`${messages.enterEmail} *`}
              />
            </Form.Item>
          </div>
          <div className="input-container MB50">
            <p className="input-title">{messages.password || ''}</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: `${messages.enterPassword || ''}`,
                },
              ]}
            >
              <Input.Password
                className="input-box"
                onChange={this.onChangePasswordInput}
                name="password"
                value={txtPw}
                placeholder={`${messages.enterPass || ''} *`}
              />
            </Form.Item>
            <div className="caplockWarning">
              {isCaplock
                ? messages.caplockIsOn ||
                  'Warning: Your caplock is currently on'
                : ''}
            </div>
          </div>
          <MyButton
            isFullWidth
            className="login-button-txt"
            title={messages.log_in.toUpperCase()}
            onClick={this.handleSubmitForm}
            isLoading={isLoading}
          />
          <p
            onClick={this.onChangeRouter('resetPass')}
            className="Forgot-password MT7"
          >
            {messages.forgotPW || ''}
          </p>
        </Form>
        <div className="socialBox">
          {this.loginSocialBox()}
          <div className="sign-up-row MT40">
            <p className="new-here-txt">{messages.newHere || ''}</p>
            <p onClick={this.onChangeRouter('signup')} className="sign-up-txt">
              {messages.signup || ''}
            </p>
          </div>
        </div>
      </div>
    )
  }

  onChangeRouter = (stateRouter) => () => {
    this.setState({ stateRouter })
  }

  callbackInfo = (userId) => {
    this.setState({ userId })
  }

  render() {
    const { stateRouter } = this.state

    let page
    switch (stateRouter) {
      case 'login':
        page = <this.LoginForm />
        break
      case 'resetPass':
        page = <ResetPassPopup onChangeRouter={this.onChangeRouter} />
        break
      case 'resetPassSuccess':
        page = <ResetPassSuccess closeModal={this.props.closeModal} />
        break
      case 'signup':
        page = (
          <SignupPopup
            callback={this.callbackInfo}
            onChangeRouter={this.onChangeRouter}
            LoginSocialBox={this.loginSocialBox}
            closeModal={this.props.closeModal}
          />
        )
        break
      case 'info':
        page = (
          <SignupInforPage
            userId={this.state.userId}
            onChangeRouter={this.onChangeRouter}
            LoginSocialBox={this.loginSocialBox}
          />
        )
        break
      case 'done':
        page = <VerifyEmail closeModal={this.props.closeModal} />
        break
    }
    return page
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
})

export default connect(mapStateToProps, null)(LoginPopup)
