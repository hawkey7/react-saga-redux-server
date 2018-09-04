import Immutable from 'immutable'
import cookie from 'react-cookie'
import queryString from 'query-string'
import { LANG_LIST } from 'constants/constants'
import { getLocationSearch } from 'utils'
import { isBrowser } from 'utils/platform'

export const getInitialLang = (requestUrl?: string | undefined, ipLocation = 1) => {
  let nav_language
  if (isBrowser) {
    nav_language = window.navigator.language
  }
  let locale = queryString.parse(getLocationSearch(requestUrl)).lang || cookie.load('ETCGAME_LANG') || nav_language
  if (locale === 'zh-CN') {
    locale = 'zh'
  } else if (locale === 'zh-TW' || locale === 'zh-HK') {
    locale = 'zh-Hant'
  } else if (!LANG_LIST.includes(locale)) {
    locale = 'en'
  }
  return Immutable.fromJS({ locale, ipLocation })
}

export const getInitialStringLang = () => getInitialLang().toJS().locale
