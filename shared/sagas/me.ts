import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from 'utils/api'
import * as actions from 'actions/me'

function* getAccountInfo(action: Action<object>) {
  try {
    const info = yield call(api.getAccountInfo, action.payload)
    yield put(actions.getAccountInfoSucceeded(info))
  } catch (e) {
    yield put(actions.getAccountInfoFailed(e.message))
  }
}

function setDefaultBetCurrency(action: Action<string>) {
  localStorage.setItem('ETCGAME_DEFAULT_BET_CURRENCY', JSON.stringify({
    currency: action.payload,
    time: new Date().getTime()
  }))
}

export default function* meSaga() {
  yield takeEvery(String(actions.getAccountInfoRequested), getAccountInfo)
  yield takeEvery(String(actions.setDefaultBetCurrency), setDefaultBetCurrency)
}
