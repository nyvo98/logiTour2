import createReducer from '../lib/reducerConfig'
import { KEY_PAGE } from '../lib/constants'
import init from '../lib/initState'
import { images } from 'config/images'

export const internetRedux = createReducer(init.boolFalse, {
  [KEY_PAGE.SET_INTERNET] (state, action) {
    return action.payload
  }
})

export const globalHeader = createReducer(init.objEmpty, {
  [KEY_PAGE.SET_HEADER] (state, action) {
    return action.payload
  }
})
