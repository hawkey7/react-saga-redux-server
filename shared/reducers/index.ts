import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form/es/immutable'
import intl from 'reducers/intl'
import socket from 'reducers/socket'
import account from 'reducers/account'
import auth from 'reducers/auth'
import me from 'reducers/me'
import vcode from 'reducers/vcode'
import message from 'reducers/message'

export default combineReducers({
  router,
  form,
  intl,
  socket,
  account,
  auth,
  me,
  vcode,
  message
})
