import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'antd'
import MyButton from 'pages/Components/MyButton'
import { images } from 'config/images'
import './style.scss'
import { Router } from 'common/routes'
class NoAccessibleScreen extends React.PureComponent {
  backHome = () => {
    Router.pushRoute('/')
  }
  render () {
    return (
      <div className='no-access-container'>

        <Row type='flex' justify='center'>
          <img width={200} src={images.noAccessible} />
        </Row>

        <Row type='flex' justify='center' className='MT30'>
          <p className='text text-title'>{`YOUR WALLET ISN'T ACCESSIBLE`}</p>
        </Row>

        <Row type='flex' justify='center'>
          <MyButton title='Unlock' onClick={this.backHome} />
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, null)(NoAccessibleScreen)
