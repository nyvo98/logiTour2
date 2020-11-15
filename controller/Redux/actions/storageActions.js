import { KEY_STORE } from 'common/constants'
import { saveDataLocal } from 'common/function'

export default class StorageActions {
  static setLocale (payload) {
    saveDataLocal(KEY_STORE.SET_LOCALE, payload)
    return {
      type: KEY_STORE.SET_LOCALE,
      payload
    }
  }

  static setUserRedux (payload) {
    saveDataLocal(KEY_STORE.SET_USER, payload)
    return {
      type: KEY_STORE.SET_USER,
      payload
    }
  }

  static setSetting (payload) {
    saveDataLocal(KEY_STORE.SET_SETTING, payload)
    return {
      type: KEY_STORE.SET_SETTING,
      payload
    }
  }
}
