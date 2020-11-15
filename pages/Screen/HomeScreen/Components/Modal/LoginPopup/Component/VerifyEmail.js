import React from 'react'
import { images } from 'config/images'
import MyButton from 'pages/Components/MyButton'
import { connect } from 'react-redux'

class LoginDone extends React.PureComponent {
  render () {
    const { messages } = this.props.locale
    return (
      <div className='LoginContainer'>
        <p className='Log-in'>{messages.checkEmail}</p>
        <p className='gray-text'>{messages.alreadySentEmail}</p>

        <MyButton
          onClick={this.props.closeModal}
          containerCss='login-button'
          className='login-button-txt'
          title={messages.success}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(LoginDone)
