import React from 'react'
import { images } from 'config/images'
import './style.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import { Router } from 'common/routes'
import { withRouter } from 'next/router'

import { getNameObject } from 'common/function'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Layout, Menu, Drawer, Row, Col } from 'antd'
import Media from 'react-media'
import Link from 'next/link'
import SelectLanguage from 'pages/Components/SelectLanguage'
import MyModal from 'pages/Components/MyModal'
import LoginPopup from 'pages/Screen/HomeScreen/Components/Modal/LoginPopup'
import ContactusPopup from 'pages/Screen/HomeScreen/Components/Modal/ContactPopup'

const arrLanguage = [
  {
    title: 'United States Of America',
    lang: 'en',
    src: images.flagEnglish,
  },
  {
    title: 'Vietnam',
    lang: 'vi',
    src: images.flagVietnam,
  },
]
class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isScroll: false,
    }
    this.myModal = React.createRef()
  }

  componentDidMount() {
    window.scrolling = false
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.scrollY > 50 || window.pageYOffset > 50) {
      if (!window.scrolling) {
        this.setState({ isScroll: true })
        window.scrolling = true
      }
    } else {
      if (window.scrolling) {
        this.setState({ isScroll: false })
        window.scrolling = false
      }
    }
  }

  onShowDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onSetLocale = (lang) => () => {
    const { setLocale } = this.props
    setLocale(lang)
  }

  backHome = () => {
    Router.pushRoute('/')
  }

  samplePage = () => {
    Router.pushRoute('/sample')
  }
  menu = () => {
    let { lang } = this.props.locale
    let selectOptionList = arrLanguage.filter((obj) => obj.lang !== lang)
    return (
      <React.Fragment>
        <Menu
          theme="dark"
          mode="vertical"
          style={{
            lineHeight: '64px',
            background: '#fff',
            color: '#020815',
            padding: '15px',
            borderRadius: '12px',
          }}
        >
          {selectOptionList.map((item, i) => (
            <Menu.Item key={i} className="menu-flag-item">
              <span className={'disable'} onClick={this.onSetLocale(item.lang)}>
                <img className="flags" alt={item.title} src={item.src} />
                {`${item.title}  `}
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </React.Fragment>
    )
  }

  renderJumpBotron = () => {
    const { globalHeader, settingRedux, locale, router } = this.props

    let headerObject = globalHeader
    if (settingRedux) {
      const headerSetting = settingRedux.headerConfig.find((item) => {
        if (router.asPath === '/') {
          return item.key === 'default'
        }
        return router.asPath.includes(item.key)
      })
      if (headerSetting) {
        headerObject = headerSetting
      }
    }
    return (
      <div
        className={`header-container__header`}
        style={{
          backgroundImage: `linear-gradient(to bottom, #020815 0%, rgba(2, 8, 21, 0) 100%), url(${
            headerObject.image || globalHeader.background
          })`,
          minHeight: `${globalHeader.height || 70}vh`,
        }}
      >
        <div className="header-container__textbox">
          <div className="heading-primary">
            <div className="container">
              <h1
                className="heading-primary--main"
                dangerouslySetInnerHTML={{
                  __html:
                    getNameObject(headerObject.title, locale.lang) ||
                    globalHeader.mainTitle,
                }}
              />
              <h2
                className="heading-primary--sub"
                dangerouslySetInnerHTML={{
                  __html:
                    getNameObject(headerObject.subTitle, locale.lang) ||
                    globalHeader.subTitle,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  onShowLoginPopup = () => {
    this.myModal.current.openModal(
      <LoginPopup closeModal={this.myModal.current.closeModal} />,
      563
    )
  }

  onProfile = () => {
    Router.pushRoute('/my-page/my-account')
  }

  onShowContactPopup = () => {
    this.myModal.current.openModal(
      <ContactusPopup closeModal={this.myModal.current.closeModal} />,
      900
    )
  }

  renderDeskopNavBar() {
    const { userRedux } = this.props
    const { isScroll } = this.state
    const { messages } = this.props.locale

    return (
      <>
        <div
          className={`header-navigation ${
            isScroll ? 'header-navigation--fixed' : ''
          }`}
        >
          <div className={`header-container__topbar`}>
            <div className="container flex">
              <Row style={{ width: '100%' }}>
                <Col flex={1} className="flex align-center">
                  <i className="icon icon--map icon--14 icon--primary MR10" />
                  Cam Ranh, Khanh Hoa, Vietnam
                </Col>
                <Col flex={1} className="flex align-center">
                  <i className="icon icon--phone-fullfill MR10 icon--14 icon--primary" />{' '}
                  +84 70 2496 225
                </Col>
                <Col flex={1}>
                  <ul className="header-container__social-icons">
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
                </Col>
                <Col flex={4} className="text text-right">
                  <Menu
                    mode="horizontal"
                    theme="dark"
                    className="header-background"
                    style={{ lineHeight: '5rem', fontSize: '1.3rem' }}
                  >
                    <Menu.Item>
                      <SelectLanguage fix />
                    </Menu.Item>
                    <Menu.Item>
                      {/* {userRedux ? (<Link href='/my-page'>{(messages.welcome) + ' ' + userRedux.email}</Link>) : (<a onClick={this.onShowLoginPopup}>{messages.login}</a>)} */}
                      {userRedux ? (
                        <Link href="/my-page">
                          {messages.myAccount || 'My account'}
                        </Link>
                      ) : (
                        <a onClick={this.onShowLoginPopup}>{messages.login}</a>
                      )}
                    </Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </div>
          </div>
          <Media
            query="(min-width: 769px)"
            render={() => (
              <div className="container header-navigation__nav">
                <Menu
                  mode="horizontal"
                  theme="dark"
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: 'none',
                    fontSize: '1.3rem',
                    lineHeight: isScroll ? null : '8.4rem',
                  }}
                  className="text text-right"
                >
                  <Menu.Item style={{ float: 'left', margin: 0, padding: 0 }}>
                    <Link href="/">
                      <div className="logo">
                        <img src={images.logoHeader} alt="Adel Tour" />
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/package-list">{messages.tourPackages}</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/gallery">{messages.tourGallery}</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/about-us">{messages.aboutUs}</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      onClick={this.onShowContactPopup}
                      className="flex justify-center align-center primary"
                      style={{ display: 'flex', color: '#d0af73' }}
                    >
                      <i className="icon icon--envelop icon--34 icon--primary" />
                      {messages.contactUs}
                    </a>
                  </Menu.Item>
                </Menu>
              </div>
            )}
          />
        </div>
        <Layout.Header className="header-container">
          {this.renderJumpBotron()}
        </Layout.Header>
      </>
    )
  }

  renderMobleNavBar() {
    const { messages } = this.props.locale

    return (
      <div>
        <Drawer
          title=""
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          drawerStyle={{ background: '#020815' }}
        >
          <Menu
            theme="dark"
            mode="vertical"
            style={{ lineHeight: '64px', background: '#020815' }}
          >
            <Menu.Item>
              <Link href="/package-list">{messages.tourPackages}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/gallery">{messages.tourGallery}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/about-us">{messages.aboutUs}</Link>
            </Menu.Item>
            <Menu.Item>
              <a onClick={this.onShowContactPopup}>{messages.contactUs}</a>
            </Menu.Item>
            <Menu.Item key="2" title="submenu">
              <SelectLanguage />
            </Menu.Item>
          </Menu>
        </Drawer>
        <Layout.Header className="header-container">
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', background: '#020815' }}
          >
            <Menu.Item key="1">
              <div className="logo">
                <img src={images.logoHeader} alt="Adel Tour" />
              </div>
            </Menu.Item>
            <Menu.Item
              style={{
                float: 'right',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <a onClick={this.onShowDrawer}>
                <UnorderedListOutlined
                  style={{ fontSize: 20, color: 'white' }}
                />
              </a>
            </Menu.Item>
            <Menu.Item
              style={{ float: 'right', paddingLeft: 0, paddingRight: 0 }}
            >
              <a href="#" onClick={this.onShowLoginPopup}>
                {messages.login}
              </a>
            </Menu.Item>
          </Menu>
          {this.renderJumpBotron()}
        </Layout.Header>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Media
          query="(min-width: 769px)"
          render={() => this.renderDeskopNavBar()}
        />
        <Media
          query="(max-width: 768px)"
          render={() => this.renderMobleNavBar()}
        />
        <MyModal ref={this.myModal} />
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
  settingRedux: state.settingRedux,
  internetRedux: state.internetRedux,
  userRedux: state.userRedux,
  globalHeader: state.globalHeader,
})
const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: bindActionCreators(StorageAction.setLocale, dispatch),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
