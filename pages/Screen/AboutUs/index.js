import React, { PureComponent } from 'react'
import { Row, Col, Timeline } from 'antd'
import { connect } from 'react-redux'
import Media from 'react-media'
import './styles.scss'
import { images } from 'config/images'
import { getNameObject } from 'common/function'
import moment from 'moment'

class AboutUs extends PureComponent {
  renderTimelineItem = (contents, mergeData) => {
    console.log(contents)
    return contents.map((item) => {
      if (item.year) {
        return (
          <Timeline.Item
            dot={<p className='aboutus-timeline__dot'>{item.year}</p>} >
            <br />
            <br />
            <br />
          </Timeline.Item>
        )
      } else {
        return (
          this.renderLine(item, mergeData.indexOf(item.id) % 2 === 0 ? 'left' : 'right')
        )
      }
    })
  }

  renderTimelineItemMobile = (contents) => {
    return contents.map((item) => {
      if (item.year) {
        return (
          <Timeline.Item
            dot={<p className='aboutus-timeline__dot'>{item.year}</p>} >
            <br />
            <br />
          </Timeline.Item>
        )
      } else {
        return (
          <Timeline.Item
            dot={<div className='time-line-dot' />} color='#6d9cf4'
          >
            <p>
              <span className='aboutus-timeline__time'>
                {moment(item.date).format('DD MMM').toUpperCase()}
              </span>{' '}
              <span className='aboutus-timeline__year'>
                {moment(item.date).format('YYYY')}
              </span>{' '}
              <span className='aboutus-timeline__detail'>
                {getNameObject(
                  item.content,
                  this.props.locale.lang
                )}
              </span>
            </p>
            <br />
          </Timeline.Item>
        )
      }
    })
  }

  renderLine = (item, position) => {
    const cssPosition = position === 'left' ? 'right' : 'left'
    return (
      <Timeline.Item
        dot={<div className='time-line-dot' />} position={position} color='#6d9cf4'>
        <div className={`aboutus-timeline__${cssPosition}-side`}>
          <div className={`aboutus-timeline__${cssPosition}-side__line-${cssPosition}`}>
            <img
              className={`aboutus-timeline__${cssPosition}-side__icon`}
              src={images[position === 'left' ? 'icLineRight' : 'icLineLeft']}
            />
          </div>

          <p className={`style-${cssPosition}`}>
            <span className='aboutus-timeline__time'>
              {moment(item.date).format('DD MMM').toUpperCase()}
            </span>{' '}
            <span className='aboutus-timeline__year'>
              {moment(item.date).format('YYYY')}
            </span>
            <br />
            <span className='aboutus-timeline__detail'>
              {getNameObject(
                item.content,
                this.props.locale.lang
              )}
            </span>
          </p>
          <br />
          <br />
          <br />
        </div>
      </Timeline.Item>
    )
  }

  renderCompanyMember = () => {
    const { settingRedux } = this.props
    const { member } = settingRedux.companyConfig || []

    return (
      member &&
      member.sort((a, b) => a.numSort - b.numSort).map(({ id, image, role, name }) => {
        return (
          <Col
            key={id}
            span={6}
            xs={24}
            lg={6}
            className='memberColumn'
          >
            <div
              className='memberColumn_memberBlock'
              style={{
                backgroundImage: `url(${image})`
              }}
            />
            <p className='memberColumn_memberName'>{name}</p>
            <p className='memberColumn_memberWork'>{role}</p>
          </Col>
        )
      })
    )
  };

  render () {
    const { settingRedux } = this.props
    const { messages } = this.props.locale
    console.log(settingRedux)
    return (
      <div className='container'>
        <h3 className='h3Tag'>{messages.haveTrip}</h3>
        <p className='MT30 haveTrip'>
          {messages.aboutUsDescription}
        </p>
        <h3 className='MT90 h3Tag'>{messages.makeUsUnique}</h3>
        <div>
          <Row justify='space-between' className='uniqueRow'>
            <Col span={4} xs={24} lg={6} className='uniqueColumn'>
              <div className='uniqueColumn_uniqueBlock'>
                <img src={images.noshopIcon} />
              </div>
              <p className='uniqueColumn_textResponsive'>
                {messages.noShopping}
              </p>
            </Col>
            <Col span={4} xs={24} lg={6} className='uniqueColumn'>
              <div className='uniqueColumn_uniqueBlock'>
                <img src={images.intercomIcon} />
              </div>
              <p>{messages.interTravel}</p>
            </Col>
            <Col span={4} xs={24} lg={6} className='uniqueColumn'>
              <div className='uniqueColumn_uniqueBlock'>
                <img src={images.safeIcon} />
              </div>
              <p>{messages.honestSafe}</p>
            </Col>
            <Col span={4} xs={24} lg={6} className='uniqueColumn'>
              <div className='uniqueColumn_uniqueBlock'>
                <img src={images.achievedIcon} />
              </div>
              <p>
                <b>{messages.numAchived}</b> {messages.achived}
              </p>
            </Col>
          </Row>
        </div>
        <h3 className='MT50 h3Tag'>{messages.companyMember}</h3>
        <div>
          <Row gutter={16} className='MT20'>
            {this.renderCompanyMember()}
          </Row>
        </div>
        <h3 className='MT70 h3Tag MB50'>{messages.ourHistory}</h3>
        <Media
          query='(min-width:1200px)'
          render={() => (
            <div className='aboutus-timeline'>
              <Timeline
                style={{ width: '100%' }}
                mode='alternate'
              >
                {settingRedux &&
                  settingRedux.timelineConfig.data.map(item =>
                    this.renderTimelineItem(item.info, settingRedux.timelineConfig.mergeContent)
                  )
                }
              </Timeline>
            </div>
          )}
        />
        <Media
          query='(max-width: 1200px)'
          render={() => (
            <Timeline
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >

              {settingRedux &&
                settingRedux.timelineConfig.data.map(item =>
                  this.renderTimelineItemMobile(item.info)
                )
              }
            </Timeline>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  settingRedux: state.settingRedux
})

export default connect(mapStateToProps)(AboutUs)
