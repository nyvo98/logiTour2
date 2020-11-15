import React from 'react'

import { images } from 'config/images'
import './style.scss'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'

class BookingInformation extends React.PureComponent {
  renderProcess = (arrProcess) => {
    return arrProcess.map((prc, index) => (<li key={index}>
      <h5>{index < 10 ? `0` + Number(index + 1) : index + 1}</h5>
      <div className='step__divider' />
      {prc}
    </li>))
  }

  renderPrecautions = (arrPrecaution) => {
    return arrPrecaution.map(precaution => {
      return (
        <React.Fragment key={precaution.title}>
          <h3>{precaution.title}</h3>
          <p>
            {precaution.description}
          </p>
        </React.Fragment>
      )
    })
  }

  render () {
    const proceDureData = this.props.data.procedure
    const txtInclude = proceDureData.isInclude
    const txtExlude = proceDureData.notInclude
    const { messages } = this.props.locale
    return (
      <div className='booking-information-container'>
        <h2>{messages.bookingProcedure}</h2>
        <div className='booking__procedure'>
          <Row gutter={[50, 55]}>
            <Col xs={24} lg={12}>
              <div className='booking__procedure--included'>
                <h4>
                  <img src={images.icPos} alt='Positive Icon' /> {messages.included}
                </h4>
                <p dangerouslySetInnerHTML={{ __html: txtInclude.replace(/\n/, '<br/>') }} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className='booking__procedure--notincluded'>
                <h4>
                  <img src={images.icNeg} alt='Negative Icon' /> {messages.notIncluded}
                </h4>
                <p dangerouslySetInnerHTML={{ __html: txtExlude.replace(/\n/, '<br/>') }} />
              </div>
            </Col>
          </Row>

        </div>
        <h2>{messages.bookingProcedure}</h2>
        <ul className='step'>
          {this.renderProcess(this.props.data.process)}
        </ul>

        {/* <h2>{messages.precautionsForReservation}</h2> */}
        {/* {this.renderPrecautions(data.precautions)} */}
        <h2 className='heading heading--main'>
          {messages.cancellationAndRefund}
        </h2>

        <div className='cancellation'>
          <p>{messages.refund_line1}</p>
          <p>{messages.refund_line2}</p>
          <p>{messages.refund_line3}</p>
          <p>{messages.refund_line4}</p>
          <p>{messages.UnableToCancelOnSundaysAndHolidays}</p>
          <p>{messages.CancellationCanOnlyBeProcessedWithinWorkingHours}</p>
        </div>

        {/* Remove: 13/04/2020
        <h3>{messages.noRefund_title}</h3>
        <table className='refund-table'>
          <tr>
            <td>{messages.noRefund_line1_1}</td>
            <td>{messages.noRefund_line1_2}</td>
          </tr>
          <tr>
            <td>{messages.noRefund_line2_1}</td>
            <td>{messages.noRefund_line2_2}</td>
          </tr>
          <tr>
            <td>{messages.noRefund_line3_1}</td>
            <td>{messages.noRefund_line3_2}</td>
          </tr>
          <tr>
            <td>{messages.noRefund_line4_1}</td>
            <td>{messages.noRefund_line4_2}</td>
          </tr>
          {/* <tr>
            <td colSpan='2' className='dark'>
              {messages.noRefund_footer}
            </td>
          </tr>
        </table> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(BookingInformation)
