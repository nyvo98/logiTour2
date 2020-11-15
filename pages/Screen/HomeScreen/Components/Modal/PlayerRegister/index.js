import React from 'react'
import MyButton from 'pages/Components/MyButton'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Radio } from 'antd'
import './style.scss'
class PlayerRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      invitationCode: '',
      yourName: ''
    }
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  onInputCode= (invitationCode) => {
    this.setState({
      invitationCode
    })
  }

  onInputName= (yourName) => {
    this.setState({
      yourName
    })
  }

  render () {
    const { invitationCode, yourName } = this.state
    return (
      <div className='modal-player-register-container'>
        <p className='text text-title text-bold'>PLAYER REGISTER</p>
        <div>
          <Form layout={'horizontal'} className='form-player-register'>
            <Form.Item>
              <p className='text text-content text-color-main text-left text-size-1x'>Invitation Code:</p>
              <p className='text text-help text-left'>Please input a Tomo Address</p>
              <Input onChange={this.onInputCode} />
            </Form.Item>
            <Form.Item>
              <p className='text text-content text-color-main text-left text-size-1x'>What is your name in Crypto world?</p>
              <Input onChange={this.onInputName} />
            </Form.Item>
            <Form.Item>
              <p className='text text-content text-color-main text-left text-size-1x'>What is your role?</p>
              <div className=''>
                <Radio.Group name='radiogroup' defaultValue={1}>
                  <Radio value={1} className='radio-custom'>User</Radio>
                  <Radio value={2}>Creator</Radio>
                </Radio.Group>
              </div>
              <p className='text text-help text-left'>You can change your name and your role later.</p>
              <p className='text text-help text-color-3 text-left'>*To register as a creator, you will need to connect to your Instagram account.</p>
            </Form.Item>
          </Form>
        </div>

        <MyButton
          title='Register'
          onClick={null}
          isDisabled={invitationCode.length === 0 || yourName.length === 0}
        />
      </div>
    )
  }
}

export default Form.create({ name: 'register_email' })(PlayerRegister)
