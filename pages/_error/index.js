import React from 'react'
import './style.scss'
import { connect } from 'react-redux'
class Error404Screen extends React.PureComponent {
  render () {
    return (
      <div className='background-color-from-global text-color-from-global'>
        {`An unexpected error caused Adel to stop.
Your crash will be reported to us and we will try to fix this problem soon.

We are sorry for the inconvenience.
Please refresh your Adel.`}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(Error404Screen)
