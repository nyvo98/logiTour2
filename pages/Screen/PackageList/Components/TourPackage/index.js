import React from "react";
import {
  getNameObject,
  calculateDiffDate,
  formatNumberBro,
  stripHtml,
} from "common/function";
import { connect } from "react-redux";
import { Router } from "common/routes";
// Assets
import "./style.scss";
import MyButton from "pages/Components/MyButton";
import MyLabel from "pages/Components/MyLabel";

class TourPackage extends React.PureComponent {
  handleGoToDetail = (id) => () => {
    Router.pushRoute(`/package-detail/${id}`).then(() => window.scrollTo(0, 0));
  };

  onInputChange = (e) => {
    const { value } = e.target;
    this.setState({ keyword: value });

    if (!value) return this._fetchTourGallery();
  };

  onSubmitSearch = async () => {
    const { keyword, size } = this.state;
    const { lang } = this.props.locale;
    const req = { lang: lang, keyword: keyword, size, page: 1 };
    const response = await BaseAPI.postData("tourgallery/search", req);
    this.setState({ list: response.data, total: response.total });
  };
  onPagination = async (page) => {
    window.scrollTo(0, window.innerHeight);
    const { size } = this.state;
    const response = await BaseAPI.getData(
      `tourgallery?size=${size}&page=${page}`
    );
    this.setState({ list: response.data, total: response.total });
  };

  render() {
    const { tour, id } = this.props;
    const { lang, messages } = this.props.locale;
    const { title, image, price, description, tourInfoList } = tour;
    const tourDuration = calculateDiffDate(
      tourInfoList.duration.to,
      tourInfoList.duration.from,
      "days"
    );

    return (
      tour && (
        <div className="tour-package" onClick={this.handleGoToDetail(id)}>
          {tour.isBest && <MyLabel type="black" text={messages.best || ""} />}
          <div
            className="tour-package__photo"
            style={{
              background: `url(${image[0].image})`,
              backgroundSize: "cover",
            }}
          />
          <div className="tour-package__main">
            <div className="tour-package__header">
              <div className="tour-package__duration">
                <i className="icon icon--clock icon--14 icon--space icon--inline icon--primary" />{" "}
                {tourDuration} {messages.days || ""}
              </div>
              <div className="tour-package__price">
                $ {formatNumberBro(price)}
              </div>
            </div>
            <div className="tour-package__content">
              <h4 className="tour-package__title">
                {getNameObject(title, lang)}
              </h4>
              <article className="tour-package__description">
                {stripHtml(getNameObject(description, lang))}
              </article>
            </div>
            <div className="tour-package__footer">
              <MyButton
                title={messages.reservationDetail || ""}
                isCard
                onClick={this.handleGoToDetail(id)}
              />
            </div>
          </div>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
});
export default connect(mapStateToProps)(TourPackage);
