import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Menu, Dropdown } from 'antd'
import jaLocale from 'moment/locale/ja'
import enLocale from 'moment/locale/en-au'
import StorageAction from 'controller/Redux/actions/storageActions'

// Assets
import { images } from 'config/images'
import './style.scss'

const configRenderLanguage = [
  {
    title: '中文',
    lang: 'cn',
    src: images.flagChina
  },
  {
    title: 'English',
    lang: 'en',
    src: images.flagEnglish
  },
  {
    title: '日本語',
    lang: 'ja',
    src: images.flagJapan
  },
  {
    title: 'Vietnam',
    lang: 'vi',
    src: images.flagVietnam
  }
]
class SelectLanguage extends React.PureComponent {
  onGetDataLang=() => {
    const { settingRedux } = this.props
    if (settingRedux && settingRedux.languageConfig) {
      const newList = configRenderLanguage.filter(item => settingRedux.languageConfig.includes(item.lang))
      return newList
    } else {
      return configRenderLanguage
    }
  }

  onSetLocale = lang => () => {
    const { setLocale } = this.props
    setLocale && setLocale(lang)
    switch (lang) {
    case 'en':
      moment.updateLocale('en', enLocale, {
        monthsShort: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      })
      break
    case 'ja':
      moment.updateLocale('ja', jaLocale, {
        monthsShort: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      })
      moment.updateLocale('ja', {
        weekdays: ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']
      })
      break
    case 'cn':
      moment.updateLocale('ja', jaLocale, {
        monthsShort: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      })
      moment.updateLocale('ja', {
        weekdays: [
          '星期天',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六'
        ]
      })
      break
    }
  }

  menu = () => {
    let { lang } = this.props.locale

    const listLang = this.onGetDataLang()

    let currentSelectedObj = listLang.find(
      obj => obj.lang === lang
    )

    currentSelectedObj = currentSelectedObj || listLang[0]

    return (
      <React.Fragment>
        <Menu
          theme='light'
          mode='vertical'
          style={{ lineHeight: '36px',
            background: '#fff',
            color: '#020815',
            borderRadius: '12px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)'
          }}
          className='select-language-container'
          selectedKeys={[currentSelectedObj.lang]}
        >
          {this.onGetDataLang().map((item, i) => (
            <Menu.Item key={item.lang} className='menu-flag-item' onClick={this.onSetLocale(item.lang)}>
              <span className={'disable'}>
                <img className='flags MR10' alt={item.title} src={item.src} />
                {`${item.title}`}
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </React.Fragment>
    )
  };

  render () {
    const { fix, isFooter } = this.props
    const { lang } = this.props.locale
    const listLang = this.onGetDataLang()

    let currentSelectedObj = listLang.find(
      obj => obj.lang === lang
    )

    currentSelectedObj = currentSelectedObj || listLang[0]
    return (
      <React.Fragment>
        <Dropdown overlayStyle={fix ? { position: 'fixed' } : { }} overlay={this.menu} trigger={['click']} overlayClassName={isFooter ? 'dropdown-fix' : ''}>

          <a className='ant-dropdown-link ant-custom'>
            <img
              className='selected-flag PR7'
              alt={currentSelectedObj.title}
              src={currentSelectedObj.src}
            />
            <span className='PR7' style={{ textTransform: 'capitalize' }}>{currentSelectedObj.title}</span>{' '}
            {/* <img src={images.icArrowDown} alt='Dropdown icon' className='ico' /> */}
            <i className='icon icon--accord-arrow icon--light icon--12' />
          </a>
        </Dropdown>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  settingRedux: state.settingRedux,
  locale: state.locale
})
const mapDispatchToProps = dispatch => {
  return {
    setLocale: bindActionCreators(StorageAction.setLocale, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage)
