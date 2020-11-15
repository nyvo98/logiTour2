import React, { PureComponent } from 'react'
import MyButton from 'pages/Components/MyButton'
import { Router } from 'common/routes'
import { withRouter } from 'next/router'

import { images } from 'config/images'
import './style.scss'

class EmptyList extends PureComponent {
  state={ isLoading: false }
  onChangeRouter=() => {
    this.setState({ isLoading: true })
    Router.pushRoute('/package-list')
  }
  render () {
    return (
      <div className='booking-empty-list'>
        <img src={images.icEmptyList} alt='' className='MB37' />
        <p className='gray MB48'>Sorry. There is no reservation.</p>
        <div className='booking-empty-list__button'>
          <MyButton isLoading={this.state.isLoading} onClick={this.onChangeRouter} title='GO TO BOOKING' isFullWidth />
        </div>
      </div>
    )
  }
}

export default withRouter(EmptyList)
