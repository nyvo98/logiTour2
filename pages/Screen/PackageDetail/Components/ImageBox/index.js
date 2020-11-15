import React from 'react'

import './style.scss'

class ImageBox extends React.PureComponent {
  render () {
    const { title, src } = this.props
    return (
      <div className='image-box-container' style={{ backgroundImage: `url(${src})` }}>
        <div className='image-box-container__overlay'>
          {title}
        </div>
      </div>
    )
  }
}

export default ImageBox
