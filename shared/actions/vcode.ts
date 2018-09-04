import { createAction } from 'redux-actions'

export const sendVCodeRequested = createAction<any>('vcode/SEND_VCODE_REQUESTED')
export const sendVCodeSucceeded = createAction<any>('vcode/SEND_VCODE_SUCCEEDED')
export const sendVCodeFailed = createAction<ErrorMessage>('vcode/SEND_VCODE_FAILED')
export const updateCountDownSeconds = createAction<any>('vcode/UPDATE_COUNTDOWN_SECONDS')
export const clearCountDownSeconds = createAction<number>('vcode/CLEAR_COUNTDOWN_SECONDS')
export const hideError = createAction<any>('vcode/HIDE_ERROR')

export const queryPreferenceRequested = createAction('vcode/QUERY_PREFERENCE_REQUESTED')
export const queryPreferenceSucceeded = createAction<{}>('vcode/QUERY_PREFERENCE_SUCCEEDED')
export const queryPreferenceFailed = createAction<{}>('vcode/QUERY_PREFERENCE_FAILED')
