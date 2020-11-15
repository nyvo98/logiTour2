import React from 'react'
import { images } from 'config/images'
import MyButton from 'pages/Components/MyButton'
import { notification } from 'antd'
import { connect } from 'react-redux'
import BaseAPI from 'controller/API/BaseAPI'
import { Router } from 'common/routes'
class LoginDone extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const { token, closeModal } = this.props
    const { messages } = this.props.locale
    try {
      const response = await BaseAPI.postData('user/reg/confirm', undefined, token)

      if (response === 'authenFailed') {
        notification.error({
          message: messages.error,
          description: messages.authenExpired,
          placement: 'bottomRight'
        })
        closeModal()
        Router.pushRoute('/')
      }
    } catch (e) {
      notification.error({
        message: messages.error,
        description: messages.authenExpired,
        placement: 'bottomRight'
      })
    }
  }

  onCloseModal=() => {
    this.props.closeModal()
    Router.pushRoute('/')
  }

  render () {
    const { messages } = this.props.locale
    return (
      <div className='LoginContainer'>
        <p className='Log-in'>{messages.nowFinish}</p>
        <p className='gray-text'>{messages.discoverApp}</p>
        <img src={images.imgLoginOk} alt='imageLogin' className={'img-login'} style={{ flex: 1 }} />

        <MyButton
          onClick={this.onCloseModal}
          containerCss='login-button'
          className='login-button-txt'
          title='Start now'
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(LoginDone)
