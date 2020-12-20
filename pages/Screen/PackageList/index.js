import React from 'react'
import TourPackage from 'pages/Screen/PackageList/Components/TourPackage'
import { Row, Col, Form, Input, Result } from 'antd'
import BaseAPI from 'controller/API/BaseAPI'
import './style.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import MyModal from 'pages/Components/MyModal'
import ChangePwPopup from '../MyPage/Components/MyAccount/Components/ChangePwPopup'
import LoginDone from '../HomeScreen/Components/Modal/LoginPopup/Component/LoginDone'

class PackageList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoadingFirst: true,
      arrTours: [],
      isLoading: false,
      page: 1,
      total: null,
      size: 15,
      keyword: ""
    }
    this.ref = React.createRef()
  }

  async componentDidMount () {
    const { size } = this.state
    const response = await BaseAPI.getData(`tour?page=1&size=${size}`)
    const { data, total } = response
    if (this.props.token) {
      this.handleResetPw(this.props.token)
    }

    if (this.props.tokenConfirm) {
      this.handleOpenConfirm(this.props.tokenConfirm)
    }
    this.setState({ ...this.state, arrTours: data, total: total })
  }

  onPanigate = async () => {
    const { page, arrTours, size } = this.state
    await this.setState({ isLoading: true })
    const response = await BaseAPI.getData(`tour?page=${page + 1}&size=${size}`)
    const { data, total } = response
    const listShow = [...arrTours, ...data]
    this.setState({ ...this.state, arrTours: listShow, total: total, isLoading: false, page: page + 1 })
  };

  renderListPackage = () => {
    const { arrTours } = this.state
    return (
      arrTours &&
      arrTours.map(({ _id, ...tour }) => {
        return (
          <Col xs={24} md={12} lg={8} key={_id}>
            <TourPackage tour={tour} id={_id} />
          </Col>
        )
      })
    )
  }

  handleResetPw = (token) => {
    return this.ref.current.openModal(<ChangePwPopup closeModal={this.ref.current.closeModal} token={token} isReset />, 900)
  }

  handleOpenConfirm = (token) => {
    return this.ref.current.openModal(<LoginDone closeModal={this.ref.current.closeModal} token={token} isReset />, 900)
  }

  render () {
    const { messages } = this.props.locale
    return (
      <div className='package-list-container container'>
        <MyModal ref={this.ref} />
        <h1 className='heading heading--main MB30'>
          {messages.tourPackages || ''}
        </h1>
         
        <Row gutter={[30, 30]}>{this.renderListPackage()}</Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { locale: state.locale }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeader: bindActionCreators(PageReduxAction.setHeader, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageList)
