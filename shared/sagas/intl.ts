import { takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import cookie from 'react-cookie'
import * as actions from 'actions/intl'

function setLocale(action: Action<object>) {
  cookie.save('ETCGAME_LANG', action.payload, { path: '/' })
}

export default function* intlSaga() {
  yield takeEvery(String(actions.setLocale), setLocale)
}
