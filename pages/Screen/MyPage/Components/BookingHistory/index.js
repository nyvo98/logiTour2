import React, { Component } from "react";
import { connect } from "react-redux";

import BookingList from "../BookingList";
import EmptyList from "../EmptyList";
import MyButton from "pages/Components/MyButton";
import "./style.scss";
import BaseAPI from "controller/API/BaseAPI";

const mocks = [
  {
    id: 1,
    date: new Date(),
    package: "NAMI ISLAND DAY TOUR : 13 days",
  },
  {
    id: 2,
    date: new Date(),
    package: "NAMI ISLAND DAY TOUR : 13 days",
  },
  {
    id: 3,
    date: new Date(),
    package: "NAMI ISLAND DAY TOUR : 13 days",
  },
  {
    id: 4,
    date: new Date(),
    package: "NAMI ISLAND DAY TOUR : 13 days",
  },
];

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingList: null,
      page: 1,
      limit: 4,
    };
  }
  async componentDidMount() {
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

  renderBookingList = () => {
    const { bookingList, page, limit } = this.state;
    if (bookingList && bookingList.length === 0) {
      return <EmptyList />;
    }

    return <BookingList list={bookingList} />;
  };

  render() {
    const { messages } = this.props.locale;
    const { bookingList, limit, page } = this.state;
    return (
      <div className="booking-history-container MT100 PT50">
        <h2 className="heading heading--main PB50">
          {messages.bookingHistory || ""}
        </h2>
        {this.renderBookingList()}
        {/* Pagination */}
        <p className="MT68 MB35 dark text text-center">
          {bookingList &&
            (bookingList.length > limit
              ? limit * page
              : bookingList.length)}{" "}
          {messages.of} {bookingList && bookingList.length}
        </p>
        <div className="booking-history__button">
          <MyButton title="HISTORY MORE" isFullWidth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ locale: state.locale });

export default connect(mapStateToProps)(BookingHistory);
