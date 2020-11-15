import validator from 'validator'
import moment from 'moment'
import { KEY_STORE } from './constants'
import ReduxService from 'common/redux'
import { notification } from 'antd'
import numeral from 'numbro'

export const saveDataLocal = (key, data) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem(key, JSON.stringify(data))
}

export const getDataLocal = key => {
  // eslint-disable-next-line no-undef
  return JSON.parse(localStorage.getItem(key))
}

export const removeDataLocal = key => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem(key)
}

export const showNotification = (
  title = 'Success',
  description = '',
  type = 'success'
) => {
  notification[type]({
    message: title,
    description: description || '',
    placement: 'bottomRight',
    style: { background: 'white' },
    duration: 2
  })
}

export const shuffle = array => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const convertObjectToArray = objConvert => {
  const peopleArray = Object.keys(objConvert).map(i => objConvert[i])
  return peopleArray
}

export const getLength = value => {
  return value ? value.length : 0
}

export const lowerCase = value => {
  return value ? value.toLowerCase() : value
}

export const upperCase = value => {
  return value ? value.toUpperCase() : value
}

export const getAuthKey = () => {
  let data = getDataLocal(KEY_STORE.SET_USER)
  return data ? data.sig + '|' + data.address : ''
}

export const validateStringNumOnly = strNumber => {
  var reg = /^([0-9a-zA-Z]+)$/
  return reg.test(strNumber)
}

export const validateNumber = strNumber => {
  const reg = /^[0-9]+(\.)?[0-9]*$/
  return reg.test(strNumber)
}

export const validateInt = strNumber => {
  var reg = /^([0-9]+)$/
  return reg.test(strNumber)
}

export const validateEmail = email => {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email).toLowerCase())
}

export const validatePw = pw => {
  var re = /^.*[0-9].*$/
  return re.test(pw)
}

export const formatDecimalJavascript = number => {
  return Math.round(number * 1e12) / 1e12
}

export const roundingNumber = (number, rounding = 7) => {
  const powNumber = Math.pow(10, parseInt(rounding))
  return Math.floor(number * powNumber) / powNumber
}

export const generateId = () => {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const trimString = string => {
  return string ? string.trim() : ''
}

export const isURL = str => {
  return validator.isURL(str)
}

export const convertDateFormat = strTimestamp => {
  const lang = ReduxService.getCurrentLang()
  let timeStamp
  switch (lang) {
  case 'ja':
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  case 'cn':
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  default:
    timeStamp = moment(strTimestamp).format('DD MMM YYYY')
    break
  }
  return timeStamp
}

export const calculateDiffDate = (date1 = new Date(), date2, type) => {
  const dateNow = moment(date1)
  const dateTxs = moment(date2)
  const payload = dateNow.diff(dateTxs, type)
  return payload
}

export const isValidJSONString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isObject = value => {
  return value && typeof value === 'object' && value.constructor === Object
}

export const scientificToDecimal = num => {
  const sign = Math.sign(num)
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0'
    const parts = String(num)
      .toLowerCase()
      .split('e') // split into coeff and exponent
    const e = parts.pop() // store the exponential part
    let l = Math.abs(e) // get the number of zeros
    const direction = e / l // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split('.')

    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0])
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('')
    } else {
      const dec = coeffArray[1]
      if (dec) l = l - dec.length
      num = coeffArray.join('') + new Array(l + 1).join(zero)
    }
  }

  if (sign < 0) {
    num = -num
  }

  return num
}

export const isMobileScreen = (width = 768) => {
  return window.innerWidth < width
}

export const getNameObject = (value, locale) => {
  return value ? (getLength(value[locale]) > 0 ? value[locale] : value.en) : ''
}

export const formatNumberBro = (number, mantissa = 4, isReturnNaN) => {
  if (
    number !== 'null' &&
    number !== null &&
    !isNaN(number) &&
    number !== undefined &&
    number !== 'NaN'
  ) {
    if (number.toString().length > 0) {
      return numeral(number.toString().replace(/\,/g, '')).format({
        trimMantissa: true,
        thousandSeparated: true,
        mantissa
      })
    }
  }
  return isReturnNaN ? 'NaN' : 0
}

export const stripHtml = (html) => {
  var tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}
