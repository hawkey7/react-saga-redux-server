import { createAction } from 'redux-actions'

export const loginRequested = createAction<AuthParams>('auth/LOGIN_REQUESTED')
export const loginSucceeded = createAction<AuthResult>('auth/LOGIN_SUCCEEDED')
export const loginFailed = createAction<ErrorMessage>('auth/LOGIN_FAILED')

export const checkLoginStrategy = createAction<boolean>('auth/CHECK_USER_LOGIN_SEC_STRATEGYS')
export const showLoginStrategy = createAction<{}>('auth/SHOW_LOGIN_STRATEGY')
export const hideLoginStrategyTips = createAction('auth/HIDE_LOGIN_STRATEGY_TIPS')

export const oauthRequested = createAction<AuthParams>('auth/OAUTH_REQUESTED')
export const oauthSucceeded = createAction<AuthResult>('auth/OAUTH_SUCCEEDED')
export const oauthFailed = createAction<ErrorMessage>('auth/OAUTH_FAILED')

export const validateTokenRequested = createAction<ValidateTokenParams>('auth/VALIDATE_TOKEN_REQUESTED')
export const validateTokenSucceeded = createAction<ValidateTokenResult>('auth/VALIDATE_TOKEN_SUCCEEDED')
export const validateTokenFailed = createAction<ErrorMessage>('auth/VALIDATE_TOKEN_FAILED')

export const refreshTokenRequested = createAction<AuthParams>('auth/REFRESH_TOKEN_REQUESTED')
export const refreshTokenSucceeded = createAction<AuthResult>('auth/REFRESH_TOKEN_SUCCEEDED')
export const refreshTokenFailed = createAction<ErrorMessage>('auth/REFRESH_TOKEN_FAILED')

export const hideError = createAction('auth/ERROR_HIDE')

export const logout = createAction<{}>('auth/LOGOUT')

// mfa 多因子验证
// 获取oobCode 失败只能刷新页面 一般不会出现
export const needOobCode = createAction<any>('auth-mfa/NEED_OOB_CODE')
export const getOobCodeRequested = createAction('auth-mfa/GET_OOB_CODE_REQUESTED')
export const getOobCodeSucceeded = createAction<any>('auth-mfa/GET_OOB_CODE_SUCCESSDED')
export const getOobCodeFailed = createAction<any>('auth-mfa/GET_OOB_CODE_FAILED')

export const setCurrentAuthWay = createAction<any>('auth-mfa/SET_CURRENT_AUTH_WAY')

export const googleAuthRequested = createAction<any>('auth-mfa/GOOGLE_AUTH_REQUESTED')
export const googleAuthSucceeded = createAction<any>('auth-mfa/GOOGLE_AUTH_SUCCEEDED')
export const googleAuthFailed = createAction<any>('auth-mfa/GOOGLE_AUTH_FAILED')
export const hideGoogleAuthError = createAction('auth-mfa/HIDE_GOOGLE_AUTH_ERROR')

export const smsAuthOneRequested = createAction<any>('auth-mfa/SMS_AUTH_ONE_REQUESTED')
export const smsAuthOneSucceeded = createAction<any>('auth-mfa/SMS_AUTH_ONE_SUCCEEDED')
export const smsAuthOneFailed = createAction<any>('auth-mfa/SMS_AUTH_ONE_FAILED')
export const notFirstClickSmsButton = createAction('auth-mfa/NOT_FIRST_CLICK_SMS_BUTTON')
export const hideSmsAuthOneTip = createAction('auth-mfa/HIDE_SMS_AUTH_ONE_TIP')

export const smsAuthTwoRequested = createAction<any>('auth-mfa/SMS_AUTH_TWO_REQUESTED')
export const smsAuthTwoSucceeded = createAction<any>('auth-mfa/SMS_AUTH_TWO_SUCCEEDED')
export const smsAuthTwoFailed = createAction<any>('auth-mfa/SMS_AUTH_TWO_FAILED')
export const hideSmsAuthTwoError = createAction('auth-mfa/HIDE_SMS_AUTH_TWO_ERROR')
