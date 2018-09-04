import { createAction } from 'redux-actions'

export const changeNicknameRequest = createAction<ChangeNicknameParams>('account/CHANGE_NICKNAME_REQUEST')
export const changeNicknameSucceed = createAction<{}>('account/CHANGE_NICKNAME_SUCCESS')
export const changeNicknameFailed = createAction<{}>('account/CHANGE_NICKNAME_FAILED')

export const showChangeNicknameForm = createAction('account/SHOW_CHANGE_NICKNAME_FORM')
export const hideChangeNicknameForm = createAction('account/HIDE_CHANGE_NICKNAME_FORM')
export const hideChangeNicknameError = createAction('account/HIDE_CHANGE_NICKNAME_ERROR')
export const resetChangeNicknameForm = createAction('account/RESET_CHANGE_NICKNAME_FORM')

export const resetAccountPage = createAction('account/RESET_ACCOUNT_PAGE')

export const changeAccountCurrency = createAction<any>('account/CHANGE_ACCOUNT_CURRENCY')
export const disableChangeAccountCurrency = createAction('account/DISABLE_CHANGE_ACCOUNT_CURRENCY')
