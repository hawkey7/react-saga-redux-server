import { all, fork } from 'redux-saga/effects'
import { ENV } from 'constants/env'
import intl from 'sagas/intl'
import router from 'sagas/router'
import logger from 'sagas/logger'
import socket from 'sagas/socket'
import me from 'sagas/me'
import account from 'sagas/account'
import form from 'sagas/form'
import vcode from 'sagas/vcode'
import message from 'sagas/message'
import auth from 'sagas/auth'

const sagas = {
  router: fork(router),
  intl: fork(intl),
  socket: fork(socket),
  me: fork(me),
  account: fork(account),
  form: fork(form),
  vcode: fork(vcode),
  message: fork(message),
  auth: fork(auth),
  logger: fork(logger)
}

if (ENV === 'production') {
  delete sagas.logger
}

export default function* rootSaga() {
  yield all(sagas)
}
