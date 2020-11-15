import React, { Component } from 'react'
import { Input } from 'antd'
export default class MyInput extends Component {
  render () {
    const { stylesCss, placeholder } = this.props
    return (
      <React.Fragment>
        <Input className={`${stylesCss}`} placeholder={`${placeholder}`} />
      </React.Fragment>
    )
  }
}
