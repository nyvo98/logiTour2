import React, { Component } from 'react'
import { Input, Form, notification } from 'antd'
import { connect } from 'react-redux'
import MyButton from 'pages/Components/MyButton'
import BaseAPI from 'controller/API/BaseAPI'
import '../style.scss'
import { getLength, validatePw } from 'common/function'
import { Router } from 'common/routes'

class ChangePwPopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      txtCurrentPw: '',
      txtNewPw: '',
      txtConfirmPw: '',
      isDisabled: true,
      isContainNum: false,
      isComplete: false
    }
    this.form = React.createRef()
  }

    onChange = (event) => {
      var { name, value } = event.target
      this.setState({ [name]: value })
    };

    handleFormError = () => {
      const fieldValue = this.form.current.getFieldsValue()
      const field = this.form.current.getFieldsError()
      const errs = field.map((x) => x.errors).flat()
      this.setState({
        isDisabled: !(
          errs.length === 0 &&
                validatePw(fieldValue.newPassword) &&
                getLength(fieldValue.newPassword) >= 8 &&
                validatePw(fieldValue.confirmPassword) &&
                getLength(fieldValue.confirmPassword) >= 8
        )
      })
    };

    onSubmitNewPW = async (value) => {
      const { isReset, token, closeModal } = this.props
      const { messages } = this.props.locale
      try {
        const response = await BaseAPI.putData(
          'user/pwChange',
          {
            isReset,
            ...value
          },
          token
        )

        if (!response) {
          notification.error({
            message: messages.error,
            description: messages.oldPwWrong,
            placement: 'bottomRight'
          })
        } else {
          if (response === 'authenFailed') {
            notification.error({
              message: messages.error,
              description: messages.authenExpired,
              placement: 'bottomRight'
            })
          } else {
            notification.success({
              message: messages.success,
              description: messages.resetPassOk,
              placement: 'bottomRight'
            })
            closeModal()

            isReset && Router.pushRoute('/')
          }
        }
      } catch (e) {
        console.log(e)
        notification.error({
          message: messages.error,
          description: messages.oldPwWrong,
          placement: 'bottomRight'
        })
      }
    };

    handleSubmitButton = () => {
      this.form.current.submit()
    };

    render () {
      const { isReset } = this.props
      const { isDisabled } = this.state
      const { messages } = this.props.locale
      return (
        <div className='changePWPopup'>
          <p className='changePWPopup__title heading heading--main'>
            {isReset ? messages.resetPass : messages.changePassword}
          </p>
          <p className='deleteAccPopup_question MB50'>
            {isReset
              ? messages.resetPassSub
              : messages.changePasswordSub}
          </p>
          <Form
            ref={this.form}
            onFieldsChange={this.handleFormError}
            onFinish={this.onSubmitNewPW}
          >
            {!isReset && (
              <div className='MB16'>{messages.oldPassword || ''}</div>
            )}
            {!isReset && (
              <Form.Item
                name='oldPassword'
                rules={[
                  {
                    required: true,
                    message:
                                        (messages.oldPassword || '') +
                                        (messages.isRequired || '')
                  }
                ]}
              >
                <Input
                  type='password'
                  placeholder={messages.inputOldPassword || ''}
                  className='information_input changePWPopup__form__input'
                />
              </Form.Item>
            )}

            <div className='MB16'>{messages.newPassword || ''}</div>
            <Form.Item
              name='newPassword'
              rules={[
                {
                  required: true,
                  message:
                                    (messages.newPassword || '') +
                                    (messages.isRequired || '')
                }
              ]}
            >
              <Input
                type='password'
                onChange
                placeholder={messages.inputNewPassword || ''}
                className='information_input changePWPopup__form__input'
              />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              rules={[
                {
                  required: true,
                  message: messages.confirmPw
                },
                ({ getFieldValue }) => ({
                  validator (rule, value) {
                    if (
                      !value ||
                                        getFieldValue('newPassword') === value
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      messages.invalidConfirmPassword || ''
                    )
                  }
                })
              ]}
            >
              <Input
                type='password'
                placeholder='Confirm new password'
                className='information_input changePWPopup__form__input'
              />
            </Form.Item>
            <Form.Item className='MT50'>
              <MyButton
                onClick={this.handleSubmitButton}
                isDisabled={isDisabled}
                title={messages.confirm || ''}
                isFullWidth
              />
            </Form.Item>
          </Form>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.userRedux,
    locale: state.locale
  }
}

export default connect(mapStateToProps)(ChangePwPopup)
