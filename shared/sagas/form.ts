import { put, takeEvery } from 'redux-saga/effects'
import { ActionMeta } from 'redux-actions'
import * as authActions from 'actions/auth'

/* const checkPasswordStrength = (password: any) => {
  const checkUppercase = (value: string) => (/[A-Z]/.test(value))
  const checkLowercase = (value: string) => (/[a-z]/.test(value))
  const checkNumber = (value: string) => (/[0-9]/.test(value))
  const checkSymbol = (value: string) => (/[$&+,:;=?@#|'<>.^*()%!-]/.test(value))

  let passwordStrength = 0
  if (password) {
    if (checkLowercase(password)) passwordStrength += 1
    if (checkUppercase(password)) passwordStrength += 1
    if (checkNumber(password)) passwordStrength += 1
    if (checkSymbol(password)) passwordStrength += 1
    if (passwordStrength === 1) {
      return passwordStrength
    }
    if (passwordStrength === 2)  {
      if (password.length <= 12) {
        return 1
      }
      return passwordStrength
    }
    if (passwordStrength >= 3)  {
      if (password.length <= 12) {
        return 2
      }
      return passwordStrength
    }
  }
  return passwordStrength
}
*/

function* onChange(action: ActionMeta<object, { form: string, field: string }>) {
  const { form, field } = action.meta
  if (form === 'registerForm') {
    if (field === 'password') {
      // yield put(registerActions.setPasswordStrength(checkPasswordStrength(action.payload)))
    }

    // yield put(registerActions.hideError())
  } else if (form === 'forgotPasswordForm') {
    if (field === 'new_password') {
       //yield put(forgotPasswordActions.setPasswordStrength(checkPasswordStrength(action.payload)))
    }

    // yield put(registerActions.hideError())
  } else if (form === 'loginForm') {
    yield put(authActions.hideError())
  }
}

function* updateSyncErrors(action: ActionMeta<object, { form: string, field: string }>) {
  if (action.meta.form === 'tradeForm') {
    yield put({
      type: '@@redux-form/UPDATE_SYNC_ERRORS',
      meta: { form: 'tradeForm' },
      payload: {
        error: {},
        syncErrors: {}
      }
    })
  }
}

export default function* formSaga() {
  yield takeEvery('@@redux-form/CHANGE', onChange)
  yield takeEvery('@@redux-form/RESET', updateSyncErrors)
}
