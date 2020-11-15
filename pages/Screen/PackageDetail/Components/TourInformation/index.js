import React from 'react'
import ImageGallery from 'react-image-gallery'
import { connect } from 'react-redux'
import { formatNumberBro, getNameObject } from 'common/function'
// assets
import './style.scss'
import { images } from 'config/images'
import { Row, Col } from 'antd'
import { packageImageType } from 'common/constants'

class TourInformation extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      isVisible: false,
      currentImage: 0,
      image: null
    }
  }

  _renderVideoGallery = (item) => {
    console.log(item)
    return (
      <>
        {item.type === 'video' ? (
          <div className='gallery-video-item'>
            <div className='dim' />
            <div className='gallery-video-item__play-btn'>
              <img src={images.icBtnPlay} />
            </div>
            <img src={item.original} alt='Hello' className='image-gallery-image' />
          </div>
        ) : (
          <div>
            <img src={item.original} alt='Hello' className='image-gallery-image' />
          </div>
        )}
      </>
    )
  }

  onPhotoClick = () => {
    return this.setState({ isVisible: true })
  }

  handleCloseLightBox = () => {
    this.setState({ isVisible: false })
  }

  onLightBoxClick = e => {
    e.stopPropagation()
  }

  renderLightBox = () => {
    const currentImage = this.ref.current.getCurrentIndex()
    const { image } = this.state
    let video = ''
    if (image[currentImage].type === packageImageType.video) {
      video = image[currentImage].url && image[currentImage].url.split('?v=')[1]
    }
    return (
      <div className='lightbox' onClick={this.handleCloseLightBox}>
        <div className='lightbox__container' onClick={this.onLightBoxClick}>
          <div className='lightbox__close' onClick={this.handleCloseLightBox}>
            <img src={images.icCloseLightBox} alt='' />
          </div>
          {image[currentImage].type === packageImageType.image
            ? <img src={image[currentImage].image} alt='' />
            : (
              <div style={{ width: '80vw', height: '80vh' }} className='lightbox__videoPlayer'>
                <iframe width='100%' height='100%' src={`https://www.youtube.com/embed/${video}`} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
              </div>
            )}
        </div>
      </div>
    )
  }

setImageFormat=() => {
  if (!this.state.image) {
    const newImage = this.props.image.map(item => {
      return {
        original: item.image,
        thumbnail: item.image,
        type: item.url ? 'video' : 'image',
        ...item
      }
    })
    this.setState({ image: newImage })
  }
}

render () {
  const { isVisible, image } = this.state
  const { data, description, price, duration } = this.props
  const { lang, messages } = this.props.locale
  if (!data) return null
  this.setImageFormat()
  return (
    <div className='tour-information-container'>
      <div className='tour-detail'>
        <Row gutter={[50, 50]}>
          <Col xs={24} lg={12} xl={6}>
            <div className='tour-detail__box'>
              <img src={images.icInfoClock} alt='Duration' />
              <h6>{messages.bestTravelDuration || ''}</h6>
              <h4>{duration.best} {messages.day || ''} {duration.best - 1} {messages.night || ''}</h4>
            </div>
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <div className='tour-detail__box'>
              <img src={images.icPerson} alt='Person' />
              <h6>{messages.numberOfPerson || 'Number of Person'}</h6>
              <h4>{`${data.numPerson.from || '10'}~${data.numPerson.to || '100'}`}</h4>
            </div>
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <div className='tour-detail__box'>
              <img src={images.icInfoMap} alt='Map' />
              <h6>{messages.visiting || ''}</h6>
              <h4>{data.location}</h4>
            </div>
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <div className='tour-detail__box'>
              <img src={images.icInfoCoin} alt='Coin' />
              <h6>{messages.from || ''}</h6>
              <h4 className='fz--18'>${formatNumberBro(price)} {messages.perPerson || ''}</h4>
            </div>
          </Col>
        </Row>
      </div>
      <div className='tour-gallery'>
        {
          image ? <ImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            infinite={false}
            items={image}
            onClick={this.onPhotoClick}
            ref={this.ref}
            renderItem={this._renderVideoGallery}
          /> : null
        }
        {isVisible && this.renderLightBox()}
      </div>
      <div className='tour-description' dangerouslySetInnerHTML={{ __html: getNameObject(description, lang) }} />
    </div>
  )
}
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(TourInformation)
