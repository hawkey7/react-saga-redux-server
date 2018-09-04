import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from 'utils/api'
import * as actions from 'actions/flowId'

function* getFlowIdRequest(action: Action<ChangeNicknameParams>) {
  try {
    const result = yield call(api.getFlowId, action.payload)
    yield put(actions.getFlowIdSucceeded(result))
  } catch (e) {
    yield put(actions.getFlowIdFailed(e))
  }
}

export default function* accountSaga() {
  yield takeEvery(String(actions.getFlowIdRequested), getFlowIdRequest)
}
