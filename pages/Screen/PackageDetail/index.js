import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Divider, Tabs } from 'antd'
import MyButton from 'pages/Components/MyButton'
import MyModal from 'pages/Components/MyModal'
import TourInformation from './Components/TourInformation'
import TourSchedule from './Components/TourSchedule'
import BookingInformation from './Components/BookingInformation'
import { withRouter } from 'next/router'
import {
  getNameObject,
  formatNumberBro,
  calculateDiffDate,
  getLength,
  stripHtml,
} from 'common/function'
import BaseAPI from 'controller/API/BaseAPI'

import './style.scss'
import BookingModal from './Components/BookingModal'
import PaypalBookingModal from './Components/PaypalBookingModal'
import { bindActionCreators } from 'redux'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { images } from 'config/images'
// import LoginPopup from '../HomeScreen/Components/Modal/LoginPopup'

class PackageDetail extends React.PureComponent {
  static async getInitialProps({ query }) {
    return { query }
  }

  constructor(props) {
    super(props)

    this.state = {
      duration: {
        normal: '0',
        best: '0',
      },
      isTooltipVisible: false,
      tour: {},
      paymentInformation: null,
    }

    this.ref = React.createRef()
  }

  async componentDidMount() {
    const { query } = this.props.router

    if (query.success) this.handlePaypalSuccess(true)
    if (query.failed) this.handlePaypalSuccess(false)

    const tourDetail = await BaseAPI.getDataByMe(
      'tour',
      this.props.router.query.id
    )
    if (tourDetail) {
      const best = calculateDiffDate(
        tourDetail.tourInfoList.bestDuration.to,
        tourDetail.tourInfoList.bestDuration.from,
        'days'
      )
      const normal = calculateDiffDate(
        tourDetail.tourInfoList.duration.to,
        tourDetail.tourInfoList.duration.from,
        'days'
      )

      this.setState({
        tour: tourDetail,
        duration: {
          best,
          normal,
        },
      })
    }

    const paymentInformation = await BaseAPI.getData(
      `bookingHistory/tourPayment/${this.props.router.query.id}`
    )
    this.setState({ paymentInformation })

    const { setHeader, locale } = this.props
    const { lang } = locale
    setHeader &&
      setHeader({
        mainTitle: getNameObject(tourDetail.title, lang),
        subTitle: getNameObject(tourDetail.subDescription, lang),
        background: tourDetail.image[0].image,
        isShadow: false,
      })
  }

  handleChangeTooltipVisible = (isTooltipVisible) => {
    return this.setState({ isTooltipVisible })
  }

  handleTabChange = (activeKey) => {
    const isTooltipVisible = activeKey === 'tour-schedule'

    return this.setState({ isTooltipVisible })
  }

  handleBooking = (tour) => () => {
    const { paymentInformation } = this.state

    if (paymentInformation && paymentInformation.isPayment === false) {
      return this.handleOpenPaypal(tour)()
    }
    return this.ref.current.openModal(
      <BookingModal tour={tour} handlePayment={this.handlePaypalBooking} />,
      900
    )
  }

  handlePaypalBooking = (tour) => () => {
    const { paymentInformation } = this.state
    this.setState(
      { paymentInformation: { ...paymentInformation, ...tour } },
      () => {
        return this.handleOpenPaypal(tour)()
      }
    )
  }

  handleOpenPaypal = (tour) => () => {
    const { paymentInformation } = this.state
    const { payment } = paymentInformation || {}
    const payload = { ...tour, ...payment }

    return this.ref.current.openModal(
      <PaypalBookingModal
        isPayment={paymentInformation ? paymentInformation.isPayment : null}
        tour={payload}
      />,
      900
    )
  }

  handlePaypalSuccess = (isFail) => {
    return this.ref.current.openModal(
      <PaypalBookingModal isSuccess={isFail} />,
      900
    )
  }

  render() {
    const { isTooltipVisible, tour, duration } = this.state
    const {
      _id,
      title,
      image,
      description,
      contactList,
      subDescription,
      price,
      tourInfoList,
      tourScheduleList,
      bookingInfoList,
    } = tour
    const { lang, messages } = this.props.locale
    return (
      <div className="container package-detail">
        <MyModal ref={this.ref} />
        <Row gutter={[50, 120]}>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
            <Tabs animated={false} onChange={this.handleTabChange}>
              <Tabs.TabPane
                tab={messages.tourInformation || ''}
                key="tour-info"
              >
                <TourInformation
                  description={description}
                  duration={duration}
                  data={tourInfoList}
                  price={price}
                  image={image}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={messages.tourSchedule || ''}
                key="tour-schedule"
              >
                <TourSchedule
                  isTooltipVisible={isTooltipVisible}
                  data={tourScheduleList}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={messages.bookingInformation || ''}
                key="booking-information"
              >
                <BookingInformation data={bookingInfoList} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col xs={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
            <div className="package-detail-card">
              <h3 className="package-detail-card__title">
                {`${getNameObject(title, lang)} `}
              </h3>
              <article className="package-detail-card__description">
                {stripHtml(getNameObject(description, lang))}
              </article>
              <Row>
                <Col span={12} className="package-detail-card__priceText">
                  {messages.price}
                </Col>
                <Col span={12} className="package-detail-card__price">
                  {'$ ' + formatNumberBro(price)}
                </Col>
              </Row>
              <Divider style={{ margin: '3rem 0' }} />
              <MyButton
                isFullWidth
                isNarrow
                title={
                  <span>
                    <i className="icon icon--edit icon--light icon--inline MR10" />{' '}
                    {messages.book || ''}
                  </span>
                }
                className="package-detail-card__book-btn"
                onClick={this.handleBooking({
                  id: _id,
                  price,
                  duration,
                  title: getNameObject(title, lang),
                })}
              />
              <MyButton
                isReverse
                isFullWidth
                isNarrow
                title={<img src={images.icPaypal} alt="paypal" />}
                className="btn-paypal"
                onClick={this.handleOpenPaypal({
                  id: _id,
                  price,
                  duration,
                  title: getNameObject(title, lang),
                })}
              />

              <div className="package-detail-card__socials">
                <h3>{messages.contactUs}</h3>
                {contactList && (
                  <ul>
                    {getLength(contactList.email) > 0 && (
                      <li>
                        <a
                          href={`mailto:${contactList.email}`}
                          className="flex"
                        >
                          <i className="icon icon--email icon--dark icon--inline icon--hover-light" />
                        </a>
                      </li>
                    )}
                    {getLength(contactList.telegram) > 0 && (
                      <li>
                        <a
                          className="flex"
                          href={`https://t.me/${contactList.telegram}`}
                        >
                          <i className="icon icon--telegram icon--dark icon--inline icon--hover-light" />
                        </a>
                      </li>
                    )}
                    {getLength(contactList.wechat) > 0 && (
                      <li>
                        <a
                          className="flex"
                          href={`weixin://${contactList.wechat}`}
                        >
                          <i className="icon icon--wechat icon--dark icon--inline icon--hover-light" />
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setHeader: bindActionCreators(PageReduxAction.setHeader, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PackageDetail))
