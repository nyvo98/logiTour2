import React, { PureComponent } from 'react'
import MyButton from 'pages/Components/MyButton'
import { Divider } from 'antd'
import './styles.scss'
import { connect } from 'react-redux'
import {
  getNameObject,
  formatNumberBro,
  calculateDiffDate,
  getLength,
} from 'common/function'
import moment from 'moment'

class BookingPopup extends PureComponent {
  render() {
    if (this.props.data) {
      const { title, price, tourInfoList } = this.props.data.tourId
      const { lang, messages } = this.props.locale
      const { closeModal, data } = this.props
      const {
        firstName,
        lastName,
        email,
        nation,
        phone,
        room,
        passportFile,
        disease,
      } = data.bookingInfo
      const normal = calculateDiffDate(
        tourInfoList.duration.to,
        tourInfoList.duration.from,
        'days'
      )
      return (
        <div className="booking-popup">
          <h2 className="booking-popup__title heading heading--main">
            {messages.bookingHistory || ''}
          </h2>
          <div className="booking-popup__name dark">
            {getNameObject(title, lang)}
          </div>
          <div className="booking-popup-price">
            <div className="booking-popup-price__label">
              {messages.price || ''}
            </div>
            <div className="booking-popup-price__value dark">
              $ {formatNumberBro(price)}
            </div>
          </div>
          <Divider />
          <div className="booking-popup-info">
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.firstName || ''} :
              </div>
              <div className="booking-popup-info-item__value">{firstName}</div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.lastName || ''} :
              </div>
              <div className="booking-popup-info-item__value">{lastName}</div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.nation + ' ' + messages.name}:
              </div>
              <div className="booking-popup-info-item__value">{nation}</div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.email} :
              </div>
              <div className="booking-popup-info-item__value">{email}</div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.phone} :
              </div>
              <div className="booking-popup-info-item__value">{phone}</div>
            </div>
            {/* <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.totalPersonnel} :
              </div>
              <div className="booking-popup-info-item__value">2</div>
            </div> */}
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.passport} :
              </div>
              <div className="booking-popup-info-item__value">
                {getLength(passportFile) > 0 ? 'Y' : 'N'}
              </div>
            </div>
            {/* <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.room} :
              </div>
              <div className="booking-popup-info-item__value">{room}</div>
            </div> */}
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {messages.inquireContents} :
              </div>
              <div className="booking-popup-info-item__value">{disease}</div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {'Start date'} :
              </div>
              <div className="booking-popup-info-item__value">
                {moment(data.tourId.tourInfoList.duration.from)
                  .format('DD/MM/YYYY')
                  .toUpperCase()}
              </div>
            </div>
            <div className="booking-popup-info-item">
              <div className="booking-popup-info-item__label">
                {'End date'} :
              </div>
              <div className="booking-popup-info-item__value">
                {moment(data.tourId.tourInfoList.duration.to)
                  .format('DD/MM/YYYY')
                  .toUpperCase()}
              </div>
            </div>
          </div>
          <div className="booking-popup__button-container">
            <MyButton onClick={closeModal} title="CONFIRM" isFullWidth />
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => ({ locale: state.locale })

export default connect(mapStateToProps)(BookingPopup)
