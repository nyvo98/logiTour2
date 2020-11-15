import { KEY_PAGE } from '../lib/constants'

export default class PageReduxAction {
  static setInternet (payload) {
    return {
      type: KEY_PAGE.SET_INTERNET,
      payload
    }
  }

  static setHeader (payload) {
    payload.height = payload.height || 70

    return {
      type: KEY_PAGE.SET_HEADER,
      payload
    }
  }
}
