import { createAction } from 'redux-actions'

export const getAccountInfoRequested = createAction('me/GET_ACCOUNT_INFO_REQUESTED')
export const getAccountInfoSucceeded = createAction<Profile>('me/GET_ACCOUNT_INFO_SUCCEEDED')
export const getAccountInfoFailed = createAction<ErrorMessage>('me/GET_ACCOUNT_INFO_FAILED')

export const getWalletAddressRequested = createAction<GetWalletAddressParams>('me/GET_WALLET_REQUESTED')
export const getWalletAddressSucceeded = createAction<GetWalletAddressResult>('me/GET_WALLET_SUCCEEDED')
export const getWalletAddressFailed = createAction<ErrorMessage>('me/GET_WALLET_FAILED')

export const clearAccountInfo = createAction('me/CLEAR')
export const setAccountType = createAction('me/SET_ACCOUNT_TYPE')
export const updateHasTradePassword = createAction<{}>('me/UPDATE_TRADE_PASSWORD')

export const setDefaultBetCurrency  = createAction<string>('me/SET_DEFAULT_BET_CURRENCY')
export const setMobileDetailCurrency  = createAction<string>('me/SET_MOBILE_DETAIL_CURRENCY')
export const setUseDefaultCurrency  = createAction<string>('me/SET_USE_DEFAULT_CURRENCY')
export const setMobileBetCurrency = createAction('me/SET_MOBILE_BET_CURRENCY')
