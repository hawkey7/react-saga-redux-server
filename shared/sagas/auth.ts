import { delay } from 'redux-saga'
import { Action } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import cookie from 'react-cookie'
import { push } from 'react-router-redux'
import * as api from 'utils/api'
import * as actions from 'actions/auth'
import * as routerActions from 'actions/router'
import { getAccountInfoRequested, clearAccountInfo } from 'actions/me'
import * as socketActions from 'actions/socket'
import { getMessagesStatusRequested } from 'actions/message'
import { isMobile } from 'utils/platform'

function* login(action: Action<any>) {
  try {
    const result = yield call(api.oauth, action.payload)
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '')
    if (action.payload.source === undefined) {
      yield put(actions.oauthSucceeded({ ...result, source: isMobile ? '/mobile/user-center' : '/home/list' }))
      // yield put(betsActions.setAgreeServiceStatus(-1))
      // yield put(betsActions.setShowLoginTipStatus(-1))
    }
    if (result.statusCode && result.statusCode !== 200) {
      yield put(actions.loginFailed(result))
    } else {
      yield put(actions.oauthSucceeded({ ...result, source: action.payload.source }))
      // yield put(betsActions.setAgreeServiceStatus(-1))
      // yield put(betsActions.setShowLoginTipStatus(-1))
    }
  } catch (e) {
    if (e.message.error === 'mfa_required') {
      yield put(actions.needOobCode(e))
      yield put(actions.getOobCodeRequested())
    } else {
      yield put(actions.loginFailed(e.message.error))
    }
  }
}

function* oauth(action: Action<any>) {
  try {
    const result = yield call(api.oauth, action.payload)

    if (result.statusCode && result.statusCode !== 200) {
      yield put(actions.oauthFailed(result))
    } else {
      yield put(actions.oauthSucceeded({ ...result, grant_type: action.payload.grant_type || '' }))
    }
  } catch (e) {
    yield put(actions.oauthFailed(e.message))
  }
}

function* oauthSucceeded(action: Action<AuthResult>) {
  if (!action.payload) return

  if (!isMobile) {
    cookie.save('game_t', action.payload.access_token, {
      path: '/',
      expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000))
    })
    cookie.save('game_rt', action.payload.refresh_token, {
      path: '/',
      expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000))
    })
    if (action.payload.grant_type !== 'refresh_token') {
      yield put(push(action.payload.source))
    }
  }

  yield put(getAccountInfoRequested())
  // yield put(getBalanceRequested())
  yield put(socketActions.authenticate(`Bearer ${action.payload.access_token}`))
  yield put(getMessagesStatusRequested())
  yield delay((+action.payload.expires_in - 60) * 1000)
  if (cookie.load('game_rt')) yield put(actions.oauthRequested({ refresh_token: cookie.load('game_rt'), grant_type: 'refresh_token' }))
}

function* oauthFailed() {
  yield call(delay, 2000)
  yield put(actions.hideError())
  yield put(actions.logout({}))
}

function* loginFailed() {
  yield call(delay, 2000)
  yield put(actions.hideError())
}

function* logout(action: Action<any>) {
  if (!isMobile) {
    cookie.remove('game_t', { path: '/' })
    cookie.remove('game_rt', { path: '/' })
  }

  // yield put(clearBalance())
  yield put(clearAccountInfo())
  // yield put(clearOrders())
  yield put(socketActions.logout())
  yield call(api.logout)
  if (!isMobile) yield put(push((action.payload && action.payload.redirect) ? action.payload.redirect : '/'))
}

function* validateToken(action: Action<object>) {
  try {
    const result = yield call(api.validateToken, action.payload)
    yield put(actions.validateTokenSucceeded(result))
  } catch (e) {
    yield put(actions.validateTokenFailed(e.message))
  }
}

function* validateTokenSucceeded() {
  if (!isMobile) yield put(routerActions.matchPrivateRouter())
}

function* validateTokenFailed() {
  if (!isMobile) yield put(routerActions.matchPublicRouter())
}

function* smsAuthOneFailed(action: any) {
  if (['limit_exceeded', 'invalid_mfa_token', 'invalid_mfa_token_status'].includes(action.payload)) {
    return document.location.reload(true)
  }
}

function* smsAuthTwo(action: any) {
  try {
    const result = yield call(api.oauth, action.payload)
    if (result.statusCode && result.statusCode !== 200) {
      yield put(actions.smsAuthTwoFailed(result))
    } else {
      yield put(actions.oauthSucceeded({ ...result, grant_type: action.payload.grant_type || '' }))
    }
  } catch (e) {
    yield put(actions.smsAuthTwoFailed(e.message))
  }
}

function* smsAuthTwoFailed(action: any) {
  if (['invalid_mfa_token', 'invalid_mfa_token_status'].includes(action.payload.error)) {
    return document.location.reload(true)
  }
  yield call(delay, 2000)
  yield put(actions.hideSmsAuthTwoError())
}

export default function* authSaga() {
  yield takeEvery(String(actions.loginRequested), login)
  yield takeEvery(String(actions.loginSucceeded), oauthSucceeded)
  yield takeEvery(String(actions.loginFailed), loginFailed)
  yield takeEvery(String(actions.oauthRequested), oauth)
  yield takeEvery(String(actions.oauthSucceeded), oauthSucceeded)
  yield takeEvery(String(actions.oauthFailed), oauthFailed)
  yield takeEvery(String(actions.validateTokenRequested), validateToken)
  yield takeEvery(String(actions.validateTokenSucceeded), validateTokenSucceeded)
  yield takeEvery(String(actions.validateTokenFailed), validateTokenFailed)
  yield takeEvery(String(actions.logout), logout)
  yield takeEvery(String(actions.smsAuthOneFailed), smsAuthOneFailed)
  yield takeEvery(String(actions.smsAuthTwoRequested), smsAuthTwo)
  yield takeEvery(String(actions.smsAuthTwoFailed), smsAuthTwoFailed)
}
