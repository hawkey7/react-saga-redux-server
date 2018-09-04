import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/account'

const initialState = Immutable.fromJS({
  changeNickname : {
    data: {},
    loading: false,
    loaded: false,
    error: null,
    success: false,
    hideForm: true
  },
  currency: 'ETH',
  disableChangeCurrency: false
})

export default handleActions({
  [actions.changeNicknameRequest](state) {
    return state.update('changeNickname', (v: any) => v.set('loading', true))
  },
  [actions.changeNicknameSucceed](state) {
    return state.update('changeNickname', (v: any) => v.set('success', true).set('loading', false).set('error', null))
  },
  [actions.changeNicknameFailed](state, action) {
    return state.update('changeNickname', (v: any) => v.set('error', action.payload).set('loading', false))
  },
  [actions.hideChangeNicknameError](state) {
    return state.update('changeNickname', (v: any) => v.set('error', null))
  },
  [actions.showChangeNicknameForm]() {
    return initialState.update('changeNickname',  (v: any) => v.set('hideForm', false))
  },
  [actions.hideChangeNicknameForm]() {
    return initialState.update('changeNickname', (v: any) => v.set('hideForm', true))
  },
  [actions.resetChangeNicknameForm](state) {
    return state.set('changeNickname', initialState.get('changeNickname'))
  },
  [actions.resetAccountPage]() {
    return initialState
  },
  [actions.changeAccountCurrency](state, action) {
    return state.set('currency', action.payload.currency).set('disableChangeCurrency', true)
  },
  [actions.disableChangeAccountCurrency](state) {
    return state.set('disableChangeCurrency', false)
  }
}, initialState)
