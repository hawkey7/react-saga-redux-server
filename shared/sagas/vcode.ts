import { eventChannel, END, delay } from 'redux-saga'
import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from 'utils/api'
import * as actions from 'actions/vcode'

function countdownChannel(seconds: number) {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      seconds -= 1

      if (seconds > 0) {
        emitter(seconds)
      } else {
        emitter(END)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
}

function* countdown(action: any) {
  yield put(actions.updateCountDownSeconds({ ...action.payload, time: 60 }))
  const chan = yield call(countdownChannel, 60)

  try {
    while (true) {
      const seconds = yield take(chan)
      yield put(actions.updateCountDownSeconds({ ...action.payload, time: seconds }))
    }
  } finally {
    yield put(actions.updateCountDownSeconds({ ...action.payload, time: 0 }))
    chan.close()
  }
}

function* sendVCode(action: Action<object>) {
  try {
    yield call(api.sendVCode, action.payload)
    yield put(actions.sendVCodeSucceeded(action.payload))
  } catch (e) {
    yield put(actions.sendVCodeFailed({ ...e, ...action.payload }))
  }
}

function* sendVCodeSucceeded(action: Action<object>) {
  yield fork(countdown, action)
  yield call(delay, 2000)
  yield put(actions.hideError(action.payload))
}

function* sendVCodeFailed(action: Action<object>) {
  yield call(delay, 2000)
  yield put(actions.hideError(action.payload))
}

function* queryPreferenceRequested(action: Action<object>) {
  try {
    const result = yield call(api.getPreferences, action.payload)
    yield put(actions.queryPreferenceSucceeded(result))
  } catch (e) {
    yield put(actions.queryPreferenceFailed(e))
  }
}

export default function* vcodeSaga() {
  yield takeEvery(String(actions.sendVCodeRequested), sendVCode)
  yield takeEvery(String(actions.sendVCodeSucceeded), sendVCodeSucceeded)
  yield takeEvery(String(actions.sendVCodeFailed), sendVCodeFailed)
  yield takeEvery(String(actions.queryPreferenceRequested), queryPreferenceRequested)
}
