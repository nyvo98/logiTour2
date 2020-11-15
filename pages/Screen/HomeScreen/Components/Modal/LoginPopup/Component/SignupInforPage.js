import React, { PureComponent } from 'react'
import { Row, Col, Select, Form, Input } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { arrCountry } from 'common/constants'
import MyButton from 'pages/Components/MyButton'
import '../styles.scss'
import BaseAPI from 'controller/API/BaseAPI'
import { showNotification, getLength } from 'common/function'
import { connect } from 'react-redux'

class SignupInforPage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      txtFName: '',
      txtLName: '',
      nationCode: '',
      isLoading: false
    }
    this.form = React.createRef()
  }

  onSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  onUpdateUser = async () => {
    const { messages } = this.props.locale
    const { onChangeRouter, userId } = this.props
    const { txtFName, txtLName, nationCode } = this.state
    this.setState({ isLoading: true })
    const updateUser = await BaseAPI.putData('user', { id: userId, firstName: txtFName, lastName: txtLName, locale: nationCode, nation: nationCode })
    if (updateUser) {
      showNotification(messages.success || '', messages.createUserSuccess || '')
      onChangeRouter('done')()
    }
    this.setState({ isLoading: false })
  }

  handleFormSubmit = (event) => {
    if (event.keyCode) { return event.keyCode === 13 && this.form.current.submit() }

    return this.form.current.submit()
  }

  render () {
    const { txtLName, txtFName, nationCode, isLoading } = this.state
    const { LoginSocialBox, onChangeRouter } = this.props
    const { messages } = this.props.locale

    const isOpenBtn = getLength(txtLName) > 0 && getLength(txtFName) > 0 && getLength(nationCode) > 0
    return (
      <div className='LoginContainer login-responsive'>
        <p className='Log-in'>{messages.signup || ''}</p>
        <Form
          ref={this.form}
          name='signupInfoPage'
          onFinish={this.onUpdateUser}
          onKeyDown={this.handleFormSubmit}
        >
          <div className='input-container'>
            <Row gutter={8}>
              <Col xs={24} lg={12}>
                <p className='Last-Name'>{messages.firstName || ''}</p>
                <Form.Item name='firstName' rules={[{ required: true }]}>
                  <Input
                    className='input-box'
                    onChange={({ target }) =>
                      this.onSelectChange(target.value, 'txtFName')
                    }
                    name='firstName'
                    value={txtFName}
                    placeholder={(messages.firstName || '') + ' *'}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <p className='Last-Name'>{messages.lastName || ''}</p>
                <Form.Item name='lastname' rules={[{ required: true }]}>
                  <Input
                    className='input-box'
                    onChange={({ target }) =>
                      this.onSelectChange(target.value, 'txtLName')
                    }
                    name='firstName'
                    value={txtLName}
                    placeholder={(messages.lastName || '') + ' *'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className='input-container'>
            <p className='Nation'>{messages.nation || ''}</p>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item>
                  <Select
                    size='large'
                    suffixIcon={
                      <div style={{ transform: 'translate(-50%,-25%)' }}>
                        <i className='icon icon--accord-arrow icon--12' />
                      </div>
                    }
                    showSearch
                    placeholder={messages.pleaseSelect || ''}
                    onChange={(value) =>
                      this.onSelectChange(value, 'nationCode')
                    }
                  >
                    {arrCountry.map((item) => {
                      return (
                        <Select.Option key={item[1]} value={item[1]}>
                          {item[0]}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <MyButton
            onClick={this.handleFormSubmit}
            isFullWidth
            containerCss='socialBox'
            className='login-button-txt'
            title={messages.createAcc || ''}
            isLoading={isLoading}
          />
        </Form>
        <LoginSocialBox />
        <div className='sign-up-row'>
          <p className='new-here-txt'>{messages.haveAcc || ''}</p>
          <p onClick={onChangeRouter('login')} className='sign-up-txt'>
            {messages.login || ''}
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(SignupInforPage)
