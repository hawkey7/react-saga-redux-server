import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/vcode'

const initialState = Immutable.fromJS({
  usage: null,
  register: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  login: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  changePassword: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  forgotPassword: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  forgotTradePassword: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  withdrawSec: {
    countDownSeconds: 0,
    loading: false,
    loaded: false,
    error: null,
    showSuccess: false
  },
  preference: {
    loading: false,
    loaded: false,
    data: {}
  },
  changeEmailOld: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  },
  changeEmailNew: {
    loading: false,
    loaded: false,
    error: null,
    countDownSeconds: 0,
    showSuccess: false
  }
})

export default handleActions({
  [actions.updateCountDownSeconds](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'login' :
        return state.update('login',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'register' :
        return state.update('register',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('countDownSeconds', action.payload.time))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('countDownSeconds', action.payload.time))
      default :
        return state
    }
  },
  [actions.sendVCodeRequested](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('loading', true).set('error', null))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('loading', true).set('error', null))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('loading', true).set('error', null))
      case 'login' :
        return state.update('login',  (v: any) => v.set('loading', true).set('error', null))
      case 'register' :
        return state.update('register',  (v: any) => v.set('loading', true).set('error', null))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('loading', true).set('error', null))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('loading', true).set('error', null))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('loading', true).set('error', null))
      default :
        return state
    }
  },
  [actions.sendVCodeSucceeded](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'login' :
        return state.update('login',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'register' :
        return state.update('register',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      default :
        return state
    }
  },
  [actions.sendVCodeFailed](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'login' :
        return state.update('login',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'register' :
        return state.update('register',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      default :
        return state
    }
  },
  [actions.hideError](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'login' :
        return state.update('login',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'register' :
        return state.update('register',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('error', null).set('showSuccess', false))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('error', null).set('showSuccess', false))
      default :
        return state
    }
  },
  [actions.queryPreferenceRequested](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'forgot-password' :
        return state.update('forgotPassword', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'login' :
        return state.update('login', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'register' :
        return state.update('register', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'withdraw-email' :
        return state.update('withdrawSec', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/old' :
        return state.update('changeEmailOld', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/new' :
        return state.update('changeEmailNew', (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      default :
        return state
    }
  },
  [actions.queryPreferenceRequested](state) {
    return state.update('preference',(v: any) => v.set('loading', true).set('loaded', true))
  },
  [actions.queryPreferenceSucceeded](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'login' :
        return state.update('login',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'register' :
        return state.update('register',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('loading', false).set('loaded', true).set('error', null).set('showSuccess', true))
      default :
        return state
    }
    // return state.update('preference',(v: any) => v.set('loading', true).set('loaded', true).set('data', Immutable.fromJS(action.payload)))
  },
  [actions.queryPreferenceFailed](state, action) {
    const usage = action.payload && action.payload.usage || ''
    switch (usage) {
      case 'modify-password' :
        return state.update('changePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'forgot-password' :
        return state.update('forgotPassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-asset-password' :
        return state.update('forgotTradePassword',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'login' :
        return state.update('login',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'register' :
        return state.update('register',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'withdraw-email' :
        return state.update('withdrawSec',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-email/old' :
        return state.update('changeEmailOld',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      case 'modify-email/new' :
        return state.update('changeEmailNew',  (v: any) => v.set('loading', false).set('loaded', true).set('error', action.payload).set('showSuccess', false))
      default :
        return state
    }
  },
  [actions.queryPreferenceFailed](state) {
    return state.update('preference',(v: any) => v.set('loading', false).set('loaded', false))
  }
}, initialState)
