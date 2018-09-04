import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { reset } from 'redux-form/es/immutable'
import * as api from 'utils/api'
import * as actions from 'actions/account'
import * as meActions from 'actions/me'
import { isMobile } from 'utils/platform'

function* changeNicknameRequest(action: Action<ChangeNicknameParams>) {
  try {
    const result = yield call(api.changeNickName, action.payload)
    yield put(actions.changeNicknameSucceed(result))
  } catch (e) {
    yield put(actions.changeNicknameFailed(e))
  }
}

function* changeNicknameSucceeded() {
  if (!isMobile) yield put(reset('changeNicknameForm'))
  yield delay(1000)
  yield put(meActions.getAccountInfoRequested())
  yield put(actions.hideChangeNicknameError())
  yield put(actions.hideChangeNicknameForm())
}

function* changeNicknameFailed() {
  yield call(delay, 2000)
  yield put(actions.hideChangeNicknameError())
}

function* changeAccountCurrency() {
  yield delay(1800)
  yield put(actions.disableChangeAccountCurrency())
  yield put(reset('withdrawForm'))
}

export default function* accountSaga() {
  yield takeEvery(String(actions.changeNicknameRequest), changeNicknameRequest)
  yield takeEvery(String(actions.changeNicknameSucceed), changeNicknameSucceeded)
  yield takeEvery(String(actions.changeNicknameFailed), changeNicknameFailed)
  yield takeEvery(String(actions.changeAccountCurrency), changeAccountCurrency)
}
