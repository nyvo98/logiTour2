import storeRedux from 'controller/Redux/store/configureStore'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { showNotification, saveDataLocal, removeDataLocal } from './function'
import StorageActions from 'controller/Redux/actions/storageActions'
import { KEY_STORE } from './constants'
import init from 'controller/Redux/lib/initState'
import BaseAPI from 'controller/API/BaseAPI'

let reduxState
if (storeRedux && storeRedux.getState) {
  reduxState = storeRedux.getState()

  storeRedux.subscribe(() => {
    reduxState = storeRedux.getState()
  })
}

export default class ReduxServices {
  static async refreshInternet (isConnect, isChange) {
    const { locale } = reduxState
    const { messages } = locale

    if (isConnect) {
      isChange && showNotification(messages.warnInternerOnline)
    } else {
      showNotification(messages.warnInternerOffline)
    }

    ReduxServices.callDispatchAction(PageReduxAction.setInternet(isConnect))
  }
  static async refreshSetting () {
    const resSetting = await BaseAPI.getConfigByTypeMultiple(['headerConfig', 'termOfService', 'languageConfig', 'companyConfig', 'timelineConfig'])
    if (resSetting) {
      if (resSetting.timelineConfig) {
        var mergeContent = ([].concat.apply([], resSetting.timelineConfig.map((item, index) => item.info))).map(item => item.id)

        const newMapSetting = resSetting.timelineConfig.map((item, index) => {
          item.info.unshift({ year: item.year })
          return item
        })
        resSetting.timelineConfig = {
          mergeContent,
          data: newMapSetting
        }
      }

      ReduxServices.callDispatchAction(StorageActions.setSetting(resSetting))
      if (reduxState && reduxState.locale) {
        const { lang } = reduxState.locale
        if (resSetting.languageConfig) {
          let currentSelectedObj = resSetting.languageConfig.find(
            obj => obj === lang
          )
          if (!currentSelectedObj) {
            ReduxServices.callDispatchAction(StorageActions.setLocale(resSetting.languageConfig[0]))
          }
        }
      }
    }
  }

  static async loginUser (resLogin) {
    if (resLogin) {
      saveDataLocal(KEY_STORE.JWT_TOKEN, resLogin.jwtToken)
      ReduxServices.callDispatchAction(StorageActions.setUserRedux(resLogin.data))
    }
  }

  static async resetReduxData () {
    removeDataLocal(KEY_STORE.JWT_TOKEN)
    const storageRedux = [
      { action: StorageActions.setUserRedux, init: init.objNull }

    ]
    storageRedux.forEach(itm => {
      this.callDispatchAction(itm.action(itm.init))
    })
  }

  static async callDispatchAction (action) {
    storeRedux.dispatch(action)
  }
}
