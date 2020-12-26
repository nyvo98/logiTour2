import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Layout, Row, Col } from 'antd'
import { images } from 'config/images'
import SelectLanguage from 'pages/Components/SelectLanguage'
import './style.scss'
import MyModal from 'pages/Components/MyModal'
import ContactusPopup from 'pages/Screen/HomeScreen/Components/Modal/ContactPopup'

class Footer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.myModal = React.createRef()
  }
  onShowContactPopup = () => {
    this.myModal.current.openModal(
      <ContactusPopup closeModal={this.myModal.current.closeModal} />,
      900
    )
  }

  render() {
    const { messages } = this.props.locale
    return (
      <Layout.Footer className="footer-container">
        <div className="container">
          <Row gutter={[50, 32]} justify="center">
            <Col xs={24} lg={24}>
              <div className="footer-container__logo">
                <img src={images.logoFooter} alt="Logo Footer" />
              </div>
              <ul className="footer-container__social-icons">
                <li>
                  <a className="flex" href="mailto:nhivo.yn@gmail.com">
                    <i className="icon cursor pointer icon--email icon--grey icon--hover-primary" />
                  </a>
                </li>
                <li>
                  <a className="flex" href="https://t.me/Ny_Danyk">
                    <i className="icon cursor pointer icon--telegram icon--grey icon--hover-primary" />
                  </a>
                </li>
                <li>
                  <a className="flex" href="weixin://">
                    <i className="icon cursor pointer icon--wechat icon--grey icon--hover-primary" />
                  </a>
                </li>
              </ul>
              <div className="footer-container__copyright">
                <p>
                  <br />
                  Brand name : ADELTOUR <br />
                </p>
                <p>
                  {' '}
                  <i className="icon icon--map icon--14 icon--primary MR10" />
                  Cam Ranh, Khanh Hoa, Vietnam
                </p>
                <p>
                  {' '}
                  <i className="icon icon--phone-fullfill MR10 icon--14 icon--primary" />{' '}
                  CALL US : 070296225
                </p>
                {/* <p style={{ lineHeight: 2 }}>
                  <br />
                  <br />
                  <br />
                  <br /> <br />
                </p> */}
              </div>
            </Col>
            {/* <Col
              xs={24}
              lg={24}
              xl={24}
              className="flex align-center footer-container__column1"
            >
              <ul className="footer-container__navigation">
                <li>
                  <Link href="/package-list">
                    {messages.tourPackages || ''}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery">{messages.tourGallery || ''}</Link>
                </li>
                <li>
                  <Link href="/about-us">{messages.aboutUs || ''}</Link>
                </li>
                <li>
                  <a onClick={this.onShowContactPopup}>
                    {messages.contactUs || ''}
                  </a>
                </li>
                <li>
                  <Link href="/terms">{messages.termConditions || ''}</Link>
                </li>
                <li>
                  {' '}
                  <SelectLanguage isFooter />
                </li>
              </ul>
            </Col> */}
          </Row>
          <p className="footer-container__copyright"></p>
        </div>
        <MyModal ref={this.myModal} />
      </Layout.Footer>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
})

export default connect(mapStateToProps)(Footer)
