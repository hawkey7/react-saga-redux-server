import { call, put, takeEvery, select } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from 'utils/api'
import * as actions from 'actions/message'

function* getMessageList(action: Action<object>) {
  try {
    const result = yield call(api.getMessageList, action.payload || {
      page: action.payload,
      size: 10
    })
    console.warn(result)
    yield put(actions.getMessageListSucceeded(result))
  } catch (e) {
    yield put(actions.getMessageListFailed(e))
  }
}

function* getTipMessage(action: Action<string>) {
  try {
    const result = yield call(api.getMessageList, {
      language: action.payload || 'zh',
      page: 0,
      size: 1
    })
    yield put(actions.getTipMessageSucceeded(result))
  } catch (e) {
    yield put(actions.getTipMessageFailed(e))
  }
}

function* getMessageDetail(action: Action<string>) {
  try {
    const result = yield call(api.getMessageDetail, action.payload)
    yield put(actions.getMessageDetailSucceeded(result))
  } catch (e) {
    yield put(actions.getMessageDetailFailed(e))
  }
}

function* deleteMessage(action: Action<string>) {
  try {
    yield call(api.deleteMessage, action.payload)
    yield put(actions.toDeleteSucceeded())
  } catch (e) {
    yield put(actions.toDeleteFailed(e))
  }
}

function* readMessage(action: Action<string>) {
  try {
    yield call(api.readMessage, action.payload)
    yield put(actions.toReadedSucceeded())
  } catch (e) {
    yield put(actions.toReadedFailed(e))
  }
}

function* operationSuccess() {
  const page = yield select((state: any) => state.message.get('page'))
  const locale = yield select((state: any) => state.intl.get('locale'))
  yield put(actions.getMessageListRequested({
    page,
    language: locale,
    size: 10
  }))
}

export default function* messageSaga() {
  yield takeEvery(String(actions.getMessageListRequested), getMessageList)
  yield takeEvery(String(actions.getTipMessageRequested), getTipMessage)
  yield takeEvery(String(actions.getMessageDetailRequested), getMessageDetail)
  yield takeEvery(String(actions.toDeleteRequested), deleteMessage)
  yield takeEvery(String(actions.toReadedRequested), readMessage)
  yield takeEvery(String(actions.toDeleteSucceeded), operationSuccess)
  yield takeEvery(String(actions.toReadedSucceeded), operationSuccess)
}
