import React from 'react'
import { Row, Col } from 'antd'
import Link from 'next/link'
import { connect } from 'react-redux'
import Moment from 'moment'

import './style.scss'
import BookingPopup from '../BookingPopup'
import MyModal from 'pages/Components/MyModal'
import { getNameObject } from 'common/function'

class BookingList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.myModal = React.createRef()
  }
  onShowModalPopup=(data) => () => {
    this.myModal.current.openModal(<BookingPopup closeModal={this.myModal.current.closeModal} data={data} />, 600)
  }
  render () {
    const { list } = this.props
    const { messages, lang } = this.props.locale
    return (
      <div className='booking-history-list'>
        <Row className='booking-history-list__item booking-history-list__item--nobackground'>
          <Col span={7}>{messages.date || ''}</Col>
          <Col span={17}>{messages.package || ''}</Col>
        </Row>
        {list && list.map(item => (
          <Row key={item._id} className='booking-history-list__item' onClick={this.onShowModalPopup(item)}>
            <Col span={7} className='booking-history-list__item__date'>{(new Moment(item.createdAt)).format('D-MMM-YYYY')}</Col>
            <Col span={17} className='booking-history-list__item__title'>{item.tourId && getNameObject(item.tourId.title, lang)}
              <div className='booking-history-list__item__more'>
                <a>
                  {messages.more || ''} <i className='icon icon--more icon--primary' />
                </a>
              </div>
            </Col>
          </Row>
        ))}
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ locale: state.locale })

export default connect(mapStateToProps)(BookingList)
