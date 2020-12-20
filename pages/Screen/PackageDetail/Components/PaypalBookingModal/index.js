import React from "react";
import { connect } from "react-redux";
import MyButton from "pages/Components/MyButton";
import "./style.scss";
import { images } from "config/images";

class PaypalBookingModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleSubmitPaypal = async () => {
    const { links } = this.props.tour;
    this.setState({ isLoading: true });
    window.location.href = links[1].href;
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { duration, price, title, links } = this.props.tour || {};
    const { isSuccess, isPayment } = this.props;
    const { messages } = this.props.locale;

    if (isSuccess) {
      return (
        <div className="paypal-booking-modal-container">
          <h2 className="paypal-booking-modal-container__margin-zero heading heading--main">
            {messages.paymentOk}
          </h2>
          <h2 className="paypal-booking-modal-container__margin-zero paypal-booking-modal-container__bold heading heading--main">
            {messages.yourPaymentOk}
          </h2>
        </div>
      );
    }

    if (isSuccess === false) {
      return (
        <div className="paypal-booking-modal-container">
          <h2 className="paypal-booking-modal-container__margin-zero heading heading--main">
            {messages.paymentFailed}
          </h2>
          <h2 className="paypal-booking-modal-container__margin-zero paypal-booking-modal-container__bold heading heading--main">
            {messages.yourPaymentFailed}
          </h2>
        </div>
      );
    }

    return (
      <div className="paypal-booking-modal-container">
        <h2 className="paypal-booking-modal-container__margin-zero heading heading--main">
          {messages.yurMessageHasBeenDelivered || ""}
        </h2>
        <h2 className="paypal-booking-modal-container__margin-zero paypal-booking-modal-container__bold heading heading--main">
          {messages.pleasePayWithPayPal || ""}
        </h2>
        <div className="paypal-booking-modal-container__price">
          <div>
            {title}: {duration.best} {messages.days || ""}
          </div>
          <div className="paypal-booking-modal-container__dollars">{`VND ${price}`}</div>
        </div>
        <span className="paypal-booking-modal-container__note">
          {messages.youMustPayToCompleteYourReservation}
        </span>
        <div style={{ maxWidth: "36.4rem", width: "100%" }}>
          <MyButton
            isDisabled={!links || isPayment !== false}
            onClick={this.handleSubmitPaypal}
            isLoading={isLoading}
            title={<img src={images.icPaypal} />}
            isFullWidth
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(PaypalBookingModal);
