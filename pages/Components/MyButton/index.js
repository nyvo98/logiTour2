import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import './style.scss'
class MyButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      onClick = null,
      title = 'OK',
      isDisabled = false,
      containerCss = '',
      className = '',
      transparent = false,
      isReverse = false,
      isFullWidth = false,
      isNarrow = false,
      isCard = false,
      isLoading = false
    } = this.props
    return (
      <div className={`button-container ${containerCss}`}>
        <div
          className={`button-content ${isLoading && 'disabled-cursor'} ${(isDisabled && 'disabled') ||
            ''} ${(transparent && 'transparent') || ''} ${isReverse &&
            'reverse'} ${(isFullWidth && 'fullWidth') || ''} ${(isNarrow &&
            'narrow') ||
            ''} ${(isCard && 'isCard') || ''} ${className}`}
          onClick={(!isDisabled && !isLoading) && onClick}
        >
          {isLoading ? <LoadingOutlined /> : title}
        </div>
      </div>
    )
  }
}

export default MyButton
