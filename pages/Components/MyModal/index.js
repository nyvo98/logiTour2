import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import { Modal } from 'antd'
import './style.scss'
class MyModal extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalContent: null,
      modalWidth: 520
    }
  }

  componentDidMount () {
    // code here
  }

  openModal = (modalContent, modalWidth = 520) => {
    this.setState({
      isShowModal: true,
      modalContent,
      modalWidth
    })
  }
  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalContent: null
    })
  }

  render () {
    const { isShowModal, modalContent, modalWidth } = this.state
    return (
      <div className='modal-container'>
        <Modal
          wrapClassName='modal-wrapper'
          bodyStyle={{ borderRadius: '0.6rem', overflow: 'hidden' }}
          title={null}
          footer={null}
          centered
          visible={isShowModal}
          width={this.state.modalWidth}
          onOk={null}
          onCancel={this.closeModal}
          width={modalWidth}
          closeIcon={<i className='icon icon--close' style={{ width: 22, height: 22 }} />}
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(MyModal)
