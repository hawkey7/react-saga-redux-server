/* global ga */
import { takeEvery, put } from 'redux-saga/effects'
import { LOCATION_CHANGE, replace } from 'react-router-redux'
import cookie from 'react-cookie'
import queryString from 'query-string'
import { getLocationSearch } from 'utils'
import { LANG_LIST } from 'constants/constants'
import * as routerActions from 'actions/router'
import * as authActions from 'actions/auth'
import * as meActions from 'actions/me'
import * as socketActions from 'actions/socket'

const routes = {
  publicOnly: ['/login', '/register', '/forgot-password'],
  universal: ['/', '/tos', '/about-us', '/app-download', '/mobile-chart']
}

function* matchPrivateRouter() {
  const pathname = window.location.pathname
  if (~routes.publicOnly.indexOf(pathname)) {
    yield put(replace('/dashboard'))
  }
}

function* matchPublicRouter() {
  const pathname = window.location.pathname
  const publicOnlyOrUniversalRoutes = routes.publicOnly.concat(routes.universal)
  if (!~publicOnlyOrUniversalRoutes.indexOf(pathname) && !!~publicOnlyOrUniversalRoutes.indexOf('/pro-trade')) {
    yield put(replace('/login'))
  }
}

// function doGaActions(pathname) {
//   ga('send', 'pageview', pathname)
// }

function locationChange() {
  // const pathname = action.payload.pathname
  // yield doGaActions(pathname)
  // window.scroll(0, 0)
}

function* locationInit() {
  const token = cookie.load('game_t')

  let existPid = localStorage.getItem('ETCGAMEPID')
  if (!existPid) {
    existPid = `ETCGAME-${Date.now()}-${(Math.random() * 1000).toFixed(4)}`
    localStorage.setItem('ETCGAMEPID', existPid)
  }
  cookie.save('ETCGAMEPID', existPid, { path: '/' })

  // 设置语言参数
  const lang = queryString.parse(getLocationSearch(undefined)).lang
  if (LANG_LIST.includes(lang)) {
    cookie.save('ETCGAME_LANG', lang, { path: '/' })
  }

  if (token) {
    yield put(authActions.validateTokenRequested({ token }))
    yield put(meActions.getAccountInfoRequested())
    // yield put(balanceActions.getBalanceRequested())
    // yield put(meActions.getWalletAddressRequested({ currency: 'BTC' }))
    // yield put(meActions.getWalletAddressRequested({ currency: 'ETH' }))
    // yield put(meActions.getWalletAddressRequested({ currency: 'ETC' }))
    // yield put(meActions.getWalletAddressRequested({ currency: 'XUC' }))
    // yield put(meActions.getWalletAddressRequested({ currency: 'LTC' }))
    yield put(socketActions.initMessageSocket())
  } else {
    yield put(routerActions.matchPublicRouter())
  }

  yield put(socketActions.init())

}

export default function* routerSaga() {
  yield takeEvery(LOCATION_CHANGE, locationChange)
  yield takeEvery(String(routerActions.locationInit), locationInit)
  yield takeEvery(String(routerActions.matchPublicRouter), matchPublicRouter)
  yield takeEvery(String(routerActions.matchPrivateRouter), matchPrivateRouter)
}
