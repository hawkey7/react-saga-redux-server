import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/auth'

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false,
  error: null,
  isLoginStrategy: false,
  showLoginStrategyTips: false,
  loggedIn: false,
  getOobCode: {
    mfaInfo: null,
    loading: false,
    loaded: false,
    error: null,
    data: null,
    current: null,
    firstClick: true
  },
  googleAuth: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
    showError: false
  },
  smsAuthOne: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
    showTip: false
  },
  smsAuthTwo: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
    showError: false
  },
  currentAuthWay: null
})

export default handleActions({
  [actions.loginRequested] (state) {
    return state.set('loading', true)
  },
  [actions.loginSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
      .set('loggedIn', true)
  },
  [actions.loginFailed] (state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  [actions.oauthRequested] (state) {
    return state.set('loading', true)
  },
  [actions.oauthSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
      .set('loggedIn', true)
  },
  [actions.showLoginStrategy] (state, action) {
    return state.set('isLoginStrategy', action.payload).set('loading', false).set('showLoginStrategyTips', action.payload)
  },
  [actions.hideLoginStrategyTips] (state) {
    return state.set('showLoginStrategyTips', false)
  },
  [actions.validateTokenSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
      .set('loggedIn', true)
  },
  [actions.oauthFailed] (state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  [actions.refreshTokenSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
  },
  [actions.hideError] (state) {
    return state.set('error', null)
  },
  [actions.logout] () {
    return initialState
  },
  [actions.needOobCode](state, action) {
    return state.update('getOobCode', (v: any) => v.set('mfaInfo', Immutable.fromJS(action.payload)))
  },
  [actions.getOobCodeRequested] (state) {
    return state.update('getOobCode', (v: any) => v.set('loading', true))
  },
  [actions.getOobCodeSucceeded] (state, action) {
    return state.update('getOobCode', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.getOobCodeFailed] (state, action) {
    return state.update('getOobCode', (v: any) => v.set('loading', false)
      .set('error', action.payload))
  },
  [actions.googleAuthRequested] (state) {
    return state.update('googleAuth', (v: any) => v.set('loading', true))
  },
  [actions.googleAuthSucceeded] (state, action) {
    return state.update('googleAuth', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.googleAuthFailed] (state, action) {
    return state.update('googleAuth', (v: any) => v.set('loading', false)
      .set('showError', true)
      .set('error', action.payload))
  },
  [actions.smsAuthOneRequested] (state) {
    return state.update('smsAuthOne', (v: any) => v.set('loading', true))
  },
  [actions.smsAuthOneSucceeded] (state, action) {
    return state.update('smsAuthOne', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('showTip', true)
      .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.smsAuthOneFailed] (state, action) {
    return state.update('smsAuthOne', (v: any) => v.set('loading', false)
      .set('showTip', true)
      .set('error', action.payload))
  },
  [actions.smsAuthTwoRequested] (state) {
    return state.update('smsAuthTwo', (v: any) => v.set('loading', true))
  },
  [actions.smsAuthTwoSucceeded] (state, action) {
    return state.update('smsAuthTwo', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.smsAuthTwoFailed] (state, action) {
    return state.update('smsAuthTwo', (v: any) => v.set('loading', false)
      .set('showError', true)
      .set('error', action.payload))
  },
  [actions.setCurrentAuthWay] (state, action) {
    return state.set('currentAuthWay', action.payload)
  },
  [actions.notFirstClickSmsButton](state) {
    return state.update('getOobCode', (v: any) => v.set('firstClick', false))
  },
  [actions.hideGoogleAuthError](state) {
    return state.update('googleAuth', (v: any) => v.set('showError', false))
  },
  [actions.hideSmsAuthOneTip] (state) {
    return state.update('smsAuthOne', (v: any) => v.set('showTip', false))
  },
  [actions.hideSmsAuthTwoError] (state) {
    return state.update('smsAuthTwo', (v: any) => v.set('showError', false))
  }
}, initialState)
