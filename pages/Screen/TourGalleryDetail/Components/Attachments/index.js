import React from 'react'
import { PaperClipOutlined } from '@ant-design/icons'
import './style.scss'

class Attachments extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      list: []
    }
  }

  componentDidMount () {
    const { isOpen } = this.props

    this.setState({ isOpen: isOpen || this.state.isOpen })
  }

  handlePreventClose = (e) => {
    return e.stopPropagation()
  }

  renderAttachmentsList = () => {
    const { isOpen } = this.state
    const { list } = this.props

    return (
      isOpen && (
        <ul className='attachments-list' onClick={this.handlePreventClose}>
          {list && list.map((item) => {
            let fileName = item.split('/')
            fileName = fileName[fileName.length - 1]

            return <li key={Math.random()} className='attachments-list__item'>
              <a href={process.env.REACT_APP_SERVER + fileName} download='adel_tour'>{`adel_${fileName}.jpg`}</a>
            </li>
          })}
        </ul>
      )
    )
  };

  handleToggleAttachmentsList = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  };

  render () {
    const { list } = this.props
    return (
      <div
        className='attachments-container'
        onClick={this.handleToggleAttachmentsList}
      >
        <div>
          <div className='flex align-center'>
            <i className='icon icon--clip icon--bgray icon--14 MR10' />
            {list ? list.length : 0} attachments
          </div>
          {this.renderAttachmentsList()}
        </div>
      </div>
    )
  }
}

export default Attachments
