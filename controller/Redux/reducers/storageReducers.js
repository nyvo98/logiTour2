import createReducer from '../lib/reducerConfig'
import MessageJA from 'config/lang/ja.json'
import MessageEN from 'config/lang/en.json'
import MessageCN from 'config/lang/cn.json'
import MessageVI from 'config/lang/vi.json'
import jaLocale from 'moment/locale/ja'
import cnLocale from 'moment/locale/zh-cn'
import viLocale from 'moment/locale/vi'
import enLocale from 'moment/locale/en-au'
import moment from 'moment'

import { KEY_STORE } from 'common/constants'
import initState from '../lib/initState'
const localeJA = {
  lang: 'ja',
  messages: MessageJA
}

const localeEN = {
  lang: 'en',
  messages: MessageEN
}

const localeCN = {
  lang: 'cn',
  messages: MessageCN
}

const localeVI = {
  lang: 'vi',
  messages: MessageVI
}

export const locale = createReducer(localeEN, {
  [KEY_STORE.SET_LOCALE] (state, action) {
    switch (action.payload) {
    case 'en':
      moment.updateLocale('en', enLocale)
      return localeEN
    case 'ja':
      moment.updateLocale('en', jaLocale)
      return localeJA
    case 'cn':
      moment.updateLocale('en', cnLocale)
      return localeCN
    case 'vi':
      moment.updateLocale('en', viLocale)
      return localeVI
    default:
      return localeEN
    }
  }
})

export const userRedux = createReducer(initState.objNull, {
  [KEY_STORE.SET_USER] (state, action) {
    return action.payload
  }
})

export const settingRedux = createReducer(initState.objNull, {
  [KEY_STORE.SET_SETTING] (state, action) {
    return action.payload
  }
})

export const headerRedux = createReducer(initState.header, {
  [KEY_STORE.SET_HEADER] (state, action) {
    return action.payload
  }
})
