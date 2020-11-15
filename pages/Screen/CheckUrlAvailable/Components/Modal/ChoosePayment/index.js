import React from 'react'
import MyButton from 'pages/Components/MyButton'
import { Router } from 'common/routes'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Radio, Row, Col } from 'antd'
import { images } from 'config/images'
import './style.scss'
class ChoosePayment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  onChange = value => () => {
    this.setState({
      value
    })
  }

  onNext = () => {
    Router.pushRoute('/check-url-available-done')
  }

  render () {
    const { value } = this.state
    return (
      <div className='choose-payment-container'>
        <p className='text text-title text-bold'>CHOOSE PAYMENT METHOD</p>
        <p className='text text-color-4 text-bold text-size-2x'>TOTAL FEE 100 HB POINT</p>
        <p className='text text-color-1 text-size-2x MT30'>Please choose one of the payment methods below</p>
        <Row type='flex' align='center' className='MT10 MB30'>
          <Col span='16'>
            <Row gutter={[10, 15]} className='flex justify-center cursor pointer' onClick={this.onChange(1)}>
              <Col span='18'>
                <img width={25} src={images.icHB} />
                <span className='text text-color-1 PL5'>HB POINT</span>
              </Col>
              <Col span='4' type='flex' align='right'>
                <Radio value={1} checked={value === 1} />
              </Col>
            </Row>
            <Row gutter={[10, 15]} className='flex justify-center cursor pointer' onClick={this.onChange(2)}>
              <Col span='18'>
                <img width={25} src={images.icFree} />
                <span className='text text-color-1 PL5'>FREE CREATING POINT</span>
              </Col>
              <Col span='4' type='flex' align='right'>
                <Radio value={2} checked={value === 2} />
              </Col>
            </Row>
          </Col>
        </Row>
        <MyButton
          title='Create'
          onClick={this.onNext}
          isDisabled={value <= 0} />
      </div>
    )
  }
}

export default Form.create({ name: 'register_email' })(ChoosePayment)
