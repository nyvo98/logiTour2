import React from 'react'
import { Row, Col, Form, Input, Result } from 'antd'
// import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'
import TourGalleryCard from './Components/TourGalleryCard'
// import { debounce } from ‘lodash’
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { images } from 'config/images'
import { getNameObject } from 'common/function'
import Moment from 'moment'

import './style.scss'
import BaseAPI from 'controller/API/BaseAPI'
import MyPagination from 'pages/Components/MyPagination'

// const mocks = [1, 2, 3, 4]

class TourGallery extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      keyword: '',
      list: [],
      total: null,
      size: 15
    }
  }

  componentDidMount () {
    const { setHeader } = this.props
    setHeader &&
      setHeader({
        mainTitle: 'TOUR GALLERY',
        subTitle:
          'The old and new Korea are juxtaposed in an itinerary that combines the sophisticated excitement of Seoul',
        background: images.headerBackground,
        isShadow: true
      })

    this._fetchTourGallery()
  }

  _fetchTourGallery = async () => {
    try {
      const response = await BaseAPI.getData(`tourgallery?size=15&page=1`)
      this.setState({ list: response.data, total: response.total })
    } catch (e) {
      console.log(e)
    }
  }

  onInputChange = e => {
    const { value } = e.target
    this.setState({ keyword: value })

    if (!value) return this._fetchTourGallery()
  };

  onSubmitSearch = async () => {
    const { keyword, size } = this.state
    const { lang } = this.props.locale
    const req = { lang: lang, keyword: keyword, size, page: 1 }
    const response = await BaseAPI.postData('tourgallery/search', req)
    this.setState({ list: response.data, total: response.total })
  };
  onPagination = async page => {
    window.scrollTo(0, window.innerHeight)
    const { size } = this.state
    const response = await BaseAPI.getData(
      `tourgallery?size=${size}&page=${page}`
    )
    this.setState({ list: response.data, total: response.total })
  };

  renderTourList = () => {
    const { keyword, list } = this.state
    const { messages, lang } = this.props.locale
    if ((!list || list.length === 0) && !keyword) {
      return (
        <Result
          icon={<img src={images.notFound} />}
          subTitle={messages.sorryThereIsNoPost || ''}
        />
      )
    }

    if ((!list || list.length === 0) && keyword) {
      return (
        <Result
          icon={<img src={images.noResult} />}
          subTitle={messages.sorryThereIsNoResult}
        />
      )
    }

    return (
      <Row gutter={[23, 30]}>
        {list.map(item => {
          return (
            <Col key={Math.random()} xs={24} md={12} lg={6}>
              <TourGalleryCard
                id={item._id}
                title={getNameObject(item.title, lang)}
                images={item.image}
                createdUser={item.createdUser}
                createdAt={new Moment(item.createdAt).locale('us').format('LL')}
              />
            </Col>
          )
        })}
      </Row>
    )
  };

  render () {
    const { keyword } = this.state
    const { messages } = this.props.locale

    return (
      <div className='tour-gallery-container container'>
        <h2 className='heading heading--main MB90'>
          {messages.tourGallery || ''}
        </h2>
        <Row>
          <Col
            xs={24}
            md={{
              span: 12,
              offset: 12
            }}
            lg={{
              span: 8,
              offset: 16
            }}
            justify='end'
          >
            <Form onSubmit={this.onSubmitSearch}>
              <Form.Item>
                <Input.Search
                  onChange={this.onInputChange}
                  onSearch={this.onSubmitSearch}
                  enterButton={<i className='icon icon--search icon--14' />}
                  size='large'
                  value={keyword}
                  placeholder={messages.pleaseEnterSearchWord || ''}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {this.renderTourList()}
        {/* Result */}

        <Row justify='center' className='MT50 MB100 text text-center'>
          <Col
            style={{ marginLeft: 0 }}
            xs={24}
            md={{
              span: 16,
              offset: 3
            }}
            lg={{
              span: 12,
              offset: 6
            }}
          >
            {this.state.list.length === 0 ? (
              ''
            ) : (
              <MyPagination
                onChange={this.onPagination}
                defaultCurrent={1}
                total={this.state.total}
                pageSize={this.state.size}
              />
            )}
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(TourGallery)
