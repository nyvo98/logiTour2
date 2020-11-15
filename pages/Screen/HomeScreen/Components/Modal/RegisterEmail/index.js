import React from 'react'
import MyButton from 'pages/Components/MyButton'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input } from 'antd'
import './style.scss'
class RegisterEmail extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  onInputEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  render () {
    const { email } = this.state
    const { getFieldDecorator, getFieldsError } = this.props.form
    const inputEmail = getFieldDecorator('email', {
      rules: [
        {
          type: 'email',
          message: 'Please enter a valid email address'
        }
      ],
      validateTrigger: 'onChange'
    })(<Input placeholder='ex@gmail.com' onChange={this.onInputEmail} />)
    return (
      <div className='modal-register-email-container'>
        <p className='text text-title text-bold'>REGISTER EMAIL</p>
        <p className='text text-content'>As the next step, please register your email</p>
        <div>
          <Form layout={'horizontal'}>
            <Form.Item>
              {inputEmail}
            </Form.Item>
          </Form>
        </div>
        <MyButton
          title='Register'
          onClick={null}
          isDisabled={email.length === 0 || this.hasErrors(getFieldsError())}
        />
      </div>
    )
  }
}

export default Form.create({ name: 'register_email' })(RegisterEmail)
