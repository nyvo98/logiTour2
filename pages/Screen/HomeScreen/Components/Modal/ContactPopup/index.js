import React, { Component } from 'react'
import { Row, Col, Input, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { MailFilled } from '@ant-design/icons'
import BaseAPI from 'controller/API/BaseAPI'
import { showNotification } from 'common/function'
import './styles.scss'
import { images } from 'config/images'
// import MyButton from 'pages/Components/MyButton'
const { TextArea } = Input

class ContactusPopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnable: false
    }
  }
  onFinish = async values => {
    const { messages } = this.props.locale
    console.log('Hello: ', values)
    const resContactus = await BaseAPI.postData('contactUs', values)
    if (resContactus) {
      if (resContactus.errMess) {
        showNotification(messages.contactFail || '', messages.contactFailDetail || '')
      } else {
        showNotification(messages.contactSuccess || '')
        this.props.closeModal()
      }
    }
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  };
  render () {
    const { messages } = this.props.locale
    const { userRedux } = this.props
    return (
      <div className='contact-us-container'>
        <Form
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          initialValues={{
            email: userRedux ? userRedux.email : '',
            firstName: userRedux ? userRedux.firstName : '',
            lastName: userRedux ? userRedux.lastName : ''
          }}
        >
          <div>
            <h2 className='contactUs'>{messages.contactUs || ''}</h2>
            <div>
              <p className='yourInfor'>{messages.yourInfor || ''}</p>
              <Row>
                <Col xs={24} lg={8}>
                  <Form.Item
                    name='firstName'
                    rules={[
                      {
                        required: true,
                        message: `${messages.inputFirstName || ''}`
                      },
                      {
                        max: 25,
                        message: `${messages.maxLength25 || ''}`
                      }
                    ]}
                  >
                    <Input
                      className='input-box information_input '
                      placeholder={`${messages.firstName || ''} *`}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8} className='col-last-name'>
                  <Form.Item
                    className='information'
                    name='lastName'
                    rules={[
                      {
                        required: true,
                        message:
                      `${messages.inputLastName || ''}`
                      },
                      {
                        max: 25,
                        message: `${messages.maxLength25 || ''}`
                      }
                    ]}
                  >
                    <Input
                      className='input-box information_inputMiddle'
                      placeholder={`${messages.lastName || ''} *`}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        type: 'email',
                        message: 'invalid email'
                      },
                      {
                        required: true,
                        message: `${messages.inputEmail || ''}`
                      }
                    ]}
                  >
                    <Input
                      className='input-box information_input'
                      placeholder='Email *'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className='MT10'>
              <p className='yourInfor'>{messages.title || ''}</p>
              <Form.Item
                name='title'
                rules={[
                  {
                    required: true,
                    message: `${messages.inputTitle || ''}`
                  },
                  {
                    max: 25,
                    message: `${messages.maxLength25 || ''}`
                  }
                ]}
              >
                <Input
                  className='title_input '
                  placeholder={`${messages.inputTitle || ''} *`}
                />
              </Form.Item>
              <Form.Item
                name='content'
                rules={[
                  {
                    max: 250,
                    message: `${messages.maxLength250 || ''}`
                  },
                  {
                    required: true,
                    message: `${messages.inputContent || ''}`
                  }
                ]}
              >
                <TextArea
                  className='title_input'
                  placeholder={`${messages.inputContent || ''} *`}
                  autoSize={{ minRows: 5, maxRows: 10 }}
                />
              </Form.Item>
            </div>
            <p className='MT10 note'>
              {messages.ourTeamRes || ''}
            </p>
            <Button
              disabled={!!this.state.isEnable}
              htmlType='submit'
              className='buttonCustom'
            >
              <img style={{ width: '2rem', marginRight: '2rem' }} src={images.icMail} />
              {messages.send || ''}
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
  userRedux: state.userRedux
})

export default connect(mapStateToProps, null)(ContactusPopup)
