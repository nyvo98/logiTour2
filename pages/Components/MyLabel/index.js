import React from 'react'
import './style.scss'
class MyButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      text,
      className = '',
      type
    } = this.props
    return (
      <div {...this.props} className={`${className} my-label my-label--${type}`}>
        {text}
      </div>
    )
  }
}

export default MyButton
