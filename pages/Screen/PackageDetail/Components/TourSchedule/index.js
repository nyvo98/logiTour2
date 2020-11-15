import React from 'react'
import Media from 'react-media'
import { Collapse, Row, Col, Tooltip, Timeline } from 'antd'
import { chunk } from 'lodash'
import { connect } from 'react-redux'
import { getNameObject } from 'common/function'
import './style.scss'
import ImageBox from '../ImageBox'

class TourSchedule extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      arrTimeline: null
    }
  }

  setTimelineFormat = () => {
    const { lang } = this.props.locale
    if (!this.state.arrTimeline) {
      const schedule = this.props.data || []

      let arrTimeline = schedule.reduce((f = [], current, index) => {
        const places = current.place.map((place, i) => {
          return i === 0 ? { title: place, active: true, tooltip: getNameObject(current.name, lang) } : { title: place }
        })
        return [...f, ...places]
      }, [])
      this.setState({ arrTimeline })
    }
  }

  renderTimeline = () => {
    const { arrTimeline } = this.state
    const { isTooltipVisible } = this.props
    const { lang } = this.props.locale

    const timeline = chunk(arrTimeline, 4).map(list => {
      return (
        <ul key={Math.random()}>
          {list.map(item => (
            <li key={item.id} className={`${(item.active && 'active') || ''}`}>
              <Tooltip
                overlayClassName='timeline__tooltip'
                placement='bottom'
                visible={!!item.active && isTooltipVisible}
                title={item.tooltip}
              >
                <div className='timeline__text'>{item.title}</div>
              </Tooltip>
            </li>
          ))}
        </ul>
      )
    })

    return (
      <div className='timeline' key={Math.random()}>
        {timeline}
      </div>
    )
  }

  renderTourListImage = (arrTourList) => {
    arrTourList = chunk(arrTourList, 3)

    return arrTourList.map((row, index) => {
      return (
        <Row gutter={[30]} className='MB30' key={`tour-list-image-${index}`}>
          {row.map((col, colIndex) => {
            return (
              <Col xs={24} lg={8} key={`tour-list-image-${index}-${colIndex}`}>
                <ImageBox
                  src={col.image}
                  title={col.name}
                />
              </Col>
            )
          })}
        </Row>
      )
    })
  }

  renderOtherInformation = (arrOtherInformation) => {
    return (
      <div className='info-box'>
        <ul>
          {arrOtherInformation.map((information, index) => {
            return (
              <li key={`other-information-${index}`}>
                <i className={`icon icon--dark icon--${information.type} MR13`} /> {information.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderScheduleArcordion = () => {
    const { lang } = this.props.locale
    const schedule = this.props.data || []
    return (
      <Collapse defaultActiveKey={['0']} accordion expandIcon={({ isActive }) => <i style={{ marginLeft: '3rem' }} className={`icon icon--12 icon--accord-arrow ${isActive ? 'icon--accord-arrow--active' : ''}`} />}>
        {
          schedule.map((scd, index) => {
            return (
              <Collapse.Panel
                header={
                  <div className='collapse-header'>
                    <div className='label'>{getNameObject(scd.name, lang)}</div>
                    <div className='title'>{getNameObject(scd.title, lang)}</div>
                  </div>
                }
                key={index}
              >
                <h2 className='heading heading--main'>{getNameObject(scd.title, lang)}</h2>
                {this.renderTourListImage(scd.tourList)}
                <p>
                  {getNameObject(scd.description, lang)}
                </p>
                {this.renderOtherInformation(scd.otherInformation)}
              </Collapse.Panel>
            )
          })}
      </Collapse>
    )
  }

  renderMobileTimeline = () => {
    const { arrTimeline } = this.state
    const { lang } = this.props.locale
    return (
      <Timeline mode='left'>
        {arrTimeline.map(item => (
          <Timeline.Item key={item.id} color={item.active ? '#6d9cf4' : 'gray'} label={item.tooltip}>
            <div className='PL50'>{getNameObject(item.title, lang)}</div>
          </Timeline.Item>
        ))}
      </Timeline>
    )
  }

  render () {
    const { messages } = this.props.locale
    this.setTimelineFormat()

    return (
      <div className='tour-schedule-container'>
        <h2 className='heading heading--main'>{messages.fullSchedule || ''}</h2>
        <h3 className='heading heading--sub'>
          {messages.fullScheduleSub || ''}
        </h3>
        {/* Timeline */}

        <Media
          query='(min-width: 769px)'
          render={() => this.renderTimeline()}
        />
        <Media
          query='(max-width: 769px)'
          render={() => this.renderMobileTimeline()}
        />
        {/* Arcordion */}

        {this.renderScheduleArcordion()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(TourSchedule)
