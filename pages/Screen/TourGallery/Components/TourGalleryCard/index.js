import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import './style.scss'
class TourGalleryCard extends React.PureComponent {
  render () {
    const { id, title, images, createdUser, createdAt } = this.props
    const { messages } = this.props.locale
    return (
      <Link href={`/gallery-detail/${id}`}>

        <div className='tour-gallery-card'>
          <div className='tour-gallery-card__photo' style={{ background: `url(${images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} />
          <div className='tour-gallery-card__content'>
            <div className='tour-gallery-card__title dark'>
              <span>
                {title && title}
              </span>
            </div>
            <div className='tour-gallery-card__meta'>
              <div className='tour-gallery-card__meta--by dark'>{messages.by} {createdUser}</div>
              <div className='tour-gallery-card__meta--date gray'>{createdAt}</div>
            </div>
          </div>
        </div>
      </Link>

    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(TourGalleryCard)
