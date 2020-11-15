import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Row, Col, Input } from 'antd'
import MyButton from 'pages/Components/MyButton'
import { images } from 'config/images'
import './style.scss'
class CheckUrlAvailableDone extends React.PureComponent {
  render () {
    return (
      <Row className='check-url-available-container'>

        <Row type='flex' justify='center' className='flex direction-column'>
          <Col span={18} className='box-available'>
            <Row className='flex direction-column MB30'>
              <p className='text text-title text-bold MB0'>CHECK URL AVAILABLED</p>
              <img src={images.homeLine} className='img img-line' />
            </Row>

            <Row gutter={[30, 30]} type='flex' justify='center'>
              <Col xs={24} md={12}>
                <Row type='flex' justify='end'>
                  <img src={images.cardSample} />
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row>
                  <p className='text text-bold text-left text-size-3x'>This card is taken!</p>
                </Row>
                <Row className='MT30'>
                  <p className='text text-left text-color-3 cursor pointer' onClick={null}>
                    <img width={20} src={images.icLink} />
                    <span className='PL5'>https://www.instagram.com/p/B8KobY6JUUc/</span>
                  </p>
                </Row>

                <Row>
                  <p className='text text-content text-left'>This card has already been marbled and purchased by someone else</p>
                </Row>

                <Row className='MT15'>
                  <p className='text text-left text-color-1 PB0'>OWNER</p>
                  <p className='text text-left text-color-3'>0xbe064f371a0e1e0ef7f4da08578210002219722b</p>
                </Row>

                <Row className='MT5'>
                  <p className='text text-content text-left'>You can contact to this user through Chat feature on <span className='text text-color-3'>HBWALLET</span></p>
                </Row>

                <Row type='flex' align='left' className='MT30'>
                  <MyButton
                    title='More Details'
                    className='MR15'
                    onClick={this.onCreate} />

                  <MyButton
                    title='Go To Auction Place'
                    onClick={this.onCreate}
                    transparent />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default Form.create({ name: 'register_email' })(withRouter(connect(mapStateToProps, null)(CheckUrlAvailableDone)))
