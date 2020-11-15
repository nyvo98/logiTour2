import 'react-app-polyfill/ie11'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'
import ReduxConnectIntl from 'config/lang'
import { addLocaleData } from 'react-intl'
import intlEN from 'react-intl/locale-data/en'
import intlJA from 'react-intl/locale-data/ja'
import intlCN from 'react-intl/locale-data/zh'
import intlVI from 'react-intl/locale-data/vi'

import store from 'controller/Redux/store/configureStore'
import storageActions from 'controller/Redux/actions/storageActions'
import init from 'controller/Redux/lib/initState'
import { checkLocalStoreToRedux } from 'controller/Redux/lib/reducerConfig'
import BaseContainer from 'pages/Container'
import { images } from 'config/images'
import { KEY_STORE } from 'common/constants'
import { Spin } from 'antd'
import './Style/override.less'
import './Style/global.scss'
import ReduxServices from 'common/redux'

addLocaleData([...intlEN, ...intlJA, ...intlCN, ...intlVI])
class AdelTour extends App {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      const storageRedux = [
        { key: KEY_STORE.SET_USER, action: storageActions.setUserRedux, init: init.objNull },
        { key: KEY_STORE.SET_SETTING, action: storageActions.setSetting, init: init.objNull },
        { key: KEY_STORE.SET_LOCALE, action: storageActions.setLocale, init: init.localeInit }
      ]

      const promiseArr = storageRedux.map((item) => {
        checkLocalStoreToRedux(store, item.key, item.action, item.init)
      })
      await Promise.all(promiseArr)

      await ReduxServices.refreshSetting()
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Head>
          <title>Adel Tour</title>
          <meta charSet='utf-8' />
          <link rel='shortcut icon' href={images.favicon} />
          <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
          <meta httpEquiv='Pragma' content='no-cache' />
          <meta httpEquiv='Expires' content='0' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <meta name='description' content='The new area of travel' />
          <meta itemProp='name' content='adeltour' />
          <meta itemProp='description' content='The new area of travel' />
          <meta itemProp='image' content='https://res.taketours.com/images/dest_eoul_ity_1.jpg' />
          <meta property='og:url' content='http://demo.adel-tour.com/' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='adeltour' />
          <meta property='og:description' content='The new area of travel' />
          <meta property='og:image' content='https://res.taketours.com/images/dest_eoul_ity_1.jpg' />
          <meta property='og:image:height' content='434' />
          <meta property='og:image:width' content='828' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='adeltour' />
          <meta name='twitter:description' content='The new area of travel' />
          <meta name='twitter:image' content='https://res.taketours.com/images/dest_eoul_ity_1.jpg' />
          <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap' rel='stylesheet' />
        </Head>
        {
          this.state.isLoading ? (
            <div className='loading-container'>
              <Spin size='large' />
            </div>
          ) : (
            <ReduxConnectIntl>
              <BaseContainer>
                <Component {...pageProps} />
              </BaseContainer>
            </ReduxConnectIntl>
          )
        }
      </Provider>
    )
  }
}

export default AdelTour
