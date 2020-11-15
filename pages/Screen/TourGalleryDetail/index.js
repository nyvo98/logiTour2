import React from 'react'
import { Divider } from 'antd'
import Link from 'next/link'
import { images } from 'config/images'
import { connect } from 'react-redux'
import Moment from 'moment'

import './style.scss'
import { bindActionCreators } from 'redux'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import BaseAPI from 'controller/API/BaseAPI'
import { withRouter } from 'next/router'
import { getNameObject } from 'common/function'
import Attachments from './Components/Attachments'

const mocks = [
  {
    name: '111'
  },
  {
    name: '2222'
  },
  {
    name: '2222'
  }

]
class TourGalleryDetail extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }

  constructor (props) {
    super(props)

    this.state = {
      isVisible: false,
      item: {}
    }
  }

  async componentDidMount () {
    const { setHeader } = this.props
    setHeader &&
      setHeader({
        mainTitle: 'TOUR GALLERY',
        subTitle:
          'The old and new Korea are juxtaposed in an itinerary that combines the sophisticated excitement of Seoul',
        background: images.headerBackground,
        isShadow: true
      })
    try {
      const response = await BaseAPI.getDataByMe('tourgallery', this.props.router.query.id)
      this.setState({ item: response })
    } catch (e) {
      console.log(e)
    }
  }

  onPhotoClick = index => () => {
    this.setState({
      currentImage: index,
      isVisible: true
    })
  };

  handleCloseLightBox = () => {
    this.setState({ isVisible: false })
  };

  onLightBoxClick = e => {
    e.stopPropagation()
  };

  renderLightBox = () => {
    const { currentImage, item } = this.state
    return (
      <div className='lightbox' onClick={this.handleCloseLightBox}>
        <div className='lightbox__container' onClick={this.onLightBoxClick}>
          <div className='lightbox__close' onClick={this.handleCloseLightBox}>
            <img src={images.icCloseLightBox} alt='' />
          </div>
          <img src={item.image[currentImage]} alt='' />
        </div>
      </div>
    )
  };

  renderImages = () => {
    const { item } = this.state
    return item.image && item.image.map((item, index) => {
      return <img src={item} key={index} onClick={this.onPhotoClick(index)} />
    })
  };

  render () {
    const { isVisible, item } = this.state
    const { messages, lang } = this.props.locale
    console.log(item)

    return (
      <div className='container tour-gallery-detail-container'>
        <h2 className='heading heading--main MB30'>
          {getNameObject(item.title, lang)}
        </h2>
        <div className='gallery-detail__meta'>
          <div className='gallery-detail__meta--by'>{messages.by || ''} {item.createdUser}</div>
          <div className='gallery-detail__meta--date'>
            {new Moment(item.createdAt).format('LLL')}
          </div>
        </div>
        <Divider />
        <Attachments list={item.image} />
        <div className='gallery-detail__post'>
          <div dangerouslySetInnerHTML={{ __html: getNameObject(item.description, lang) }} />
          {this.renderImages()}
          {isVisible && this.renderLightBox()}
        </div>
        <Attachments list={item.image} isOpen />
        <Divider />
        <div className='gallery-detail__return cursor pointer'>
          <Link href='/gallery'>
            <span>
              {messages.listView || ''} <i className='icon icon--more icon--4 icon--primary' />
            </span>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { locale: state.locale }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeader: bindActionCreators(PageReduxAction.setHeader, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TourGalleryDetail))
