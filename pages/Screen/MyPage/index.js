import React, { PureComponent } from "react";
import { Row, Col, Card, Divider } from "antd";
import MyButton from "pages/Components/MyButton";
import Link from "next/link";

import "./style.scss";
import EmptyList from "./Components/EmptyList";
import BookingList from "./Components/BookingList";
import BookingHistory from "./Components/BookingHistory";
import MyAccount from "./Components/MyAccount";
import MyPageDetail from "./Components/MyPageDetail";
import LogoutPopup from "./Components/LogoutPopup";
import { connect } from "react-redux";
import { images } from "config/images";
import MyModal from "pages/Components/MyModal";
import { bindActionCreators } from "redux";
import PageReduxAction from "controller/Redux/actions/pageActions";
import { withRouter } from "next/router";
import BaseAPI from "controller/API/BaseAPI";

class MyPage extends PureComponent {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);

    this.state = {
      bookingList: null,
    };

    this.modal = React.createRef();
  }

  async componentDidMount() {
    const { setHeader } = this.props;
    setHeader &&
      setHeader({
        mainTitle: "",
        subTitle: "",
        background: images.headerBackground5,
        isShadow: true,
        height: 40,
      });

    try {
      const response = await BaseAPI.getData("bookinghistory");

      const bookingList = response.map((booking) => {
        booking.tourId = JSON.parse(booking.tourId);
        return booking;
      });

      this.setState({ bookingList });
    } catch (e) {
      console.log(e);
    }
  }

  onBtnLogoutClick = () => {
    this.modal.current.openModal(<LogoutPopup />, 563);
  };

  handleGoToInfo = () => {
    const { router } = this.props;
    router.push("/my-page/my-page-detail");
  };

  handleGoToAccount = () => {
    const { router } = this.props;
    router.push("/my-page/my-account");
  };

  renderBookingList = () => {
    const { bookingList } = this.state;
    console.log(bookingList);

    if (bookingList && bookingList.length === 0) {
      return <EmptyList />;
    }

    return <BookingList list={bookingList} />;
  };

  renderPage = () => {
    const { page } = this.props.query;
    const { messages } = this.props.locale;

    switch (page ? page.toLowerCase() : "") {
      case "booking-history":
        return <BookingHistory />;
      case "my-account":
        return <MyAccount />;
      case "my-page-detail":
        return <MyPageDetail />;
      default:
        return (
          <React.Fragment>
            <Row gutter={[30, 80]}>
              <Col xs={24} lg={12}>
                <Card className="card-custom" onClick={this.handleGoToInfo}>
                  <div className="card-custom__ic MB20 MT20">
                    <i className="icon icon--user-info icon--34" />
                  </div>
                  <h2 className="heading heading--main MB20">
                    {messages.myInformation || ""}
                  </h2>
                  <p className="gray MB50">{messages.myInformationSub || ""}</p>
                  <MyButton
                    onClick={this.handleGoToInfo}
                    isCard
                    isFullWidth
                    title={messages.infoMore || ""}
                    className="card-custom__button"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card
                  className="card-custom card-custom--scale"
                  onClick={this.handleGoToAccount}
                >
                  <div className="card-custom__ic MB20 MT20">
                    <i className="icon icon--setting-account icon--34" />
                  </div>
                  <h2 className="card-custom__title heading heading--main MB20">
                    {messages.myAccount || ""}
                  </h2>
                  <p className="gray MB50">{messages.myAccountSub || ""}</p>
                  <MyButton
                    onClick={this.handleGoToAccount}
                    isFullWidth
                    title={messages.accountMore || ""}
                    className="card-custom__button"
                  />
                </Card>
              </Col>
            </Row>
            <h2 className="heading heading--main PB50">
              {messages.bookingHistory || ""}
            </h2>

            {this.renderBookingList()}
          </React.Fragment>
        );
    }
  };

  render() {
    const { userRedux, locale } = this.props;
    const { messages } = locale;

    return (
      <div className="my-page-container">
        <Row gutter={[50, 50]}>
          <Col xs={24} lg={7}>
            <Card className="card-custom">
              <img
                src={images.icProfileDefault}
                alt=""
                className="card-custom__avatar"
              />
              <h2 className="heading heading--main MB5">
                {userRedux
                  ? userRedux.firstName + " " + userRedux.lastName
                  : ""}
              </h2>
              <p className="gray">{userRedux ? userRedux.email : ""}</p>
              <Divider className="MT35 MB35" />
              <ul className="my-page-container__navigation MB70">
                <li>
                  <Link href="/my-page/my-page-detail">
                    <span>
                      <i className="icon icon--user-info icon--14 icon--space icon--dark" />
                      {messages.myInformation || ""}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/my-page/booking-history">
                    <span>
                      <i className="icon icon--clock icon--14 icon--space icon--dark" />
                      {messages.bookingHistory || ""}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/my-page/my-account">
                    <span>
                      <i className="icon icon--setting-account icon--14 icon--space icon--dark" />
                      {messages.myAccount || ""}
                    </span>
                  </Link>
                </li>
              </ul>
              <div className="my-page-container__button">
                <MyButton
                  isFullWidth
                  title={messages.logout || ""}
                  onClick={this.onBtnLogoutClick}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={17}>
            {this.renderPage()}
          </Col>
        </Row>
        <MyModal ref={this.modal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userRedux: state.userRedux,
  locale: state.locale,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setHeader: bindActionCreators(PageReduxAction.setHeader, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyPage));
