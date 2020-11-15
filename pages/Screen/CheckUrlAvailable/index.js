import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Row, Col, Input } from 'antd'
import MyButton from 'pages/Components/MyButton'
import MyModal from 'pages/Components/MyModal'
import { images } from 'config/images'
import { validateInt } from 'common/function'
import ModalChoosePayment from './Components/Modal/ChoosePayment'
import './style.scss'
class checkUrlAvailable extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      number: ''
    }
    this.myModal = React.createRef()
  }

  onInputNumber = (e) => {
    const number = e.target.value.toString()
    if (number.length === 0 || (validateInt(number) && number > 0 && number <= 3000)) {
      this.setState({
        number: e.target.value
      })
    }
  }

  onCreate = () => {
    this.myModal.current.openModal(<ModalChoosePayment />)
  }

  render () {
    const { number } = this.state
    return (
      <Row className='check-url-available-container'>

        <Row type='flex' justify='center' className='flex direction-column'>
          <Col span={18} className='box-available'>
            <Row className='flex direction-column MB30'>
              <p className='text text-title text-bold MB0'>CHECK URL AVAILABLED</p>
              <img src={images.homeLine} className='img-line' />
            </Row>

            <Row gutter={[30, 30]} type='flex' justify='center'>
              <Col xs={24} md={12}>
                <Row type='flex' justify='end'>
                  <img src={images.cardSample} />
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row>
                  <p className='text text-bold text-left text-size-2x'>Your Block mark card is in creating process</p>
                </Row>
                <Row className='MT30'>
                  <p className='text text-left text-color-3 cursor pointer' onClick={null}>
                    <img width={20} src={images.icLink} />
                    <span className='PL5'>https://www.instagram.com/p/B8KobY6JUUc/</span>
                  </p>
                </Row>
                <Row>
                  <p className='text text-content text-left'>You need to pay 1 HB POINT to be able to create ONE Block Mark Card.</p>
                </Row>
                <Row className='MT30'>
                  <p className='text text-content text-left text-bold text-size-sm'>Please input the number of Block Mark cards you want to create (max is 3000)</p>
                </Row>
                <Row>
                  <Col span={18}>
                    <Row>
                      <Input onChange={this.onInputNumber} autoComplete={'off'} value={number} />
                    </Row>
                    <Row type='flex' justify='space-between' className='MT10'>
                      <span className='text text-bold text-color-4'>TOTAL FEE:</span>
                      <span className='text text-bold text-color-4'>{number || 0} POINT</span>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row type='flex' justify='center' className='flex direction-column'>
          <Col span={18}>

            <Row type='flex' justify='center' className='MT50 MB50'>
              <Col span={18}>
                <p className='text text-content'>Once a card is created, it will automatically enter a public Dutch auction in 24 hours. You can buy it or get rewarded if someone else purchases it.</p>
              </Col>
            </Row>

            <Row gutter={15} className='flex justify-center MT30'>
              <Col xs={24} md={8} type='flex' align='center'>
                <img className='MB5' height={100} src={images.discount} />
                <p className='text'>If you purchase the card youself, you receive a 70% discount</p>
              </Col>

              <Col xs={24} md={8} type='flex' align='center'>
                <img className='MB5' height={100} src={images.receive} />
                <p className='text'>
                  If another user purchases the card, you receive 70% of the sales price
                </p>
              </Col>

              <Col xs={24} md={8} type='flex' align='center'>
                <img className='MB5' height={100} src={images.sentBack} />
                <p className='text'>
                  If there is no buyer after the auction is finished, the card will be sent back to you
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row type='flex' justify='center' className='flex direction-column MT30'>
          <MyButton title='Create' onClick={this.onCreate} isDisabled={!(number > 0 && number <= 3000)} />
        </Row>

        <MyModal ref={this.myModal} />
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default Form.create({ name: 'register_email' })(withRouter(connect(mapStateToProps, null)(checkUrlAvailable)))
