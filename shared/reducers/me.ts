import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { CURRENCY_LIST } from 'constants/constants'
import * as actions from 'actions/me'

const initialState = Immutable.fromJS({
  data: {
    bank_accounts: [],
    wallets: {},
    kyc_info: {},
    has_trade_password: null
  },
  balances: CURRENCY_LIST.reduce((total: any, currency: string) => ({
    ...total,
    [currency]: {
      total: 0,
      available: 0,
      frozen: 0
    }
  }), {}),
  loading: false,
  loaded: false,
  error: null,
  walletLoading: false,
  walletLoaded: false,
  walletError: null,
  defaultBetCurrency: 'ETH',
  mobileDetailCurrency: 'ETH',
  useDefaultCurrency: true,
  mobileBetCurrency: 'ETH'
})

export default handleActions({
  [actions.getAccountInfoRequested] (state) {
    return state.set('loading', true)
  },
  [actions.getAccountInfoSucceeded] (state, action) {
    return state.set('loading', false).set('loaded', true)
      .set('data',
        Immutable.fromJS(action.payload)
        .update('wallets', (v: any) => v.reduce((wallets: any, wallet: any) => wallets.set(wallet.get('currency'), wallet.get('address')), Immutable.fromJS({})))
      )
      .update('balances', (v: any) => Immutable.fromJS(action.payload.balances).reduce((v: any, balance: any) => v.update(balance.get('currency'), (v: any) => v.set('total', balance.get('total')).set('available', balance.get('available')).set('frozen', balance.get('frozen'))), v))
  },
  [actions.getAccountInfoFailed] (state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  [actions.getWalletAddressRequested] (state) {
    return state.set('walletLoading', true)
  },
  [actions.getWalletAddressSucceeded] (state, action) {
    return state.set('walletLoading', false).set('walletLoaded', true).update('data', (v: any) => v.update('wallets', (w: any) => w.set(action.payload.currency, action.payload.address)))
  },
  [actions.getWalletAddressFailed] (state, action) {
    return state.set('walletLoading', false)
      .set('walletError', action.payload)
  },
  [actions.updateHasTradePassword] (state, action) {
    return state.set('data', Immutable.fromJS(action.payload).update('has_trade_password', true))
  },
  [actions.setDefaultBetCurrency](state, action) {
    return state.set('defaultBetCurrency', action.payload)
  },
  [actions.clearAccountInfo] () {
    return Immutable.fromJS({
      data: {
        bank_accounts: [],
        wallets: {},
        kyc_info: {}
      },
      balances: CURRENCY_LIST.reduce((total: any, currency: string) => ({
        ...total,
        [currency]: {
          total: 0,
          available: 0,
          frozen: 0
        }
      }), {}),
      loading: false,
      loaded: false,
      error: null,
      walletLoading: false,
      walletLoaded: false,
      walletError: null,
      mobileBetCurrency: 'ETH',
      defaultBetCurrency: JSON.parse(localStorage.getItem('ETCGAME_DEFAULT_BET_CURRENCY') || '{}').currency || 'ETH'
    })
  },
  [actions.setMobileDetailCurrency] (state, action) {
    return state.set('mobileDetailCurrency', action.payload)
  },
  [actions.setUseDefaultCurrency] (state, action) {
    return state.set('useDefaultCurrency', action.payload)
  },
  [actions.setMobileBetCurrency](state, action) {
    return state.set('mobileBetCurrency', action.payload)
  }
}, initialState)
