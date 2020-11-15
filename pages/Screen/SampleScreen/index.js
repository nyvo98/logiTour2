import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import { Button, Modal } from 'antd'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import './style.scss'
class SampleScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }

  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalContent: null
    }
  }

  componentDidMount () {
    // code here
  }

  openModal = (modalContent) => {
    this.setState({
      confirmLoading: false,
      isShowModal: true,
      modalContent
    })
  }

  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalContent: null
    })
  }

  backToHome = () => {
    Router.pushRoute('/')
  }

  onShowNoti= () => {
    const description = 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    showNotification(description)
  }

  onShowModal = () => {
    this.openModal('Content here..')
  }

  handleOk = () => {
    this.setState({
      modalContent: 'The modal will be closed after two seconds',
      confirmLoading: true
    })

    setTimeout(() => {
      this.setState({
        isShowModal: false,
        modalContent: null
      })
    }, 2000)
  }

  render () {
    const { isShowModal, modalContent, confirmLoading } = this.state
    return (
      <div className='sample-page-container'>

        <p className='text-color-from-global'>This is sample page with text color is extended from global.css!</p>

        <p>
          <Button type='warning' onClick={this.onShowNoti}>
            Click me to show alert!
          </Button>
        </p>
        <p>
          <Button type='danger' onClick={this.onShowModal}>
            Click me to show modal!
          </Button>
        </p>

        <p>
          <Button type='primary' onClick={this.backToHome}>
            Back to home
          </Button>
        </p>

        <Modal
          title='Sample Title'
          visible={isShowModal}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.closeModal}
        >
          {modalContent && modalContent}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: bindActionCreators(StorageAction.setLocale, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SampleScreen))
