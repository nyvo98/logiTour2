import React from 'react'
import MyButton from 'pages/Components/MyButton'
import { Row, Col } from 'antd'
import './style.scss'
const ListDomainAvailable = (props) => {
  return (
    <div className='modal-list-domain-container'>
      <p className='text text-title text-bold'>LIST OF ALL DOMAINS AVAILABLE</p>
      <Row gutter={[5, 5]} type='flex' justify='center'>
        <Col span={20}>
          <Row gutter={[5, 5]} type='flex' justify='center'>
            <Col span={12}>
              <span className='text text-content'>WIKIHOW</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>HOWSTUFFWORKS</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>MOTOR1</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>GAMESPOT</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>METACRITIC</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>OPENSEA</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>WIKIHOW</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>HOWSTUFFWORKS</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>MOTOR1</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>GAMESPOT</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>METACRITIC</span>
            </Col>
            <Col span={12}>
              <span className='text text-content'>OPENSEA</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <MyButton />
    </div>
  )
}

export default ListDomainAvailable
