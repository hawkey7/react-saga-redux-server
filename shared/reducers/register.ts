import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/register'

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false,
  error: null,
  passwordStrength: null,
  showSuccess: false,
  flowId: null,
  step: 1,
  toLoginCountDownSeconds: 0,
  passRobot: false
})

export default handleActions({
  // [actions.getFlowId](state) {
  //   return state.set('error', null)
  // },
  // [actions.getFlowIdSuccess](state, action) {
  //   return state.set('flowId', action.payload.flowId)
  //     .set('error', null)
  // },
  [actions.postRegisterRequested](state) {
    return state.set('loading', false)
      .set('error', null)
  },
  [actions.postRegisterSucceeded](state) {
    return state.set('loading', true)
      .set('error', null)
  },
  [actions.postRegisterFailed](state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  // [actions.registerStep1Requested](state) {
  //   return state.set('loading', true)
  //     .set('error', null)
  // },
  // [actions.registerToStep2](state) {
  //   return state.set('loading', false)
  //     .set('step', 2)
  //     .set('error', null)
  // },
  // [actions.registerStep2Requested](state) {
  //   return state.set('loading', true)
  //     .set('error', null)
  // },
  [actions.registerSucceeded](state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .update('data', (v: any) => v.merge(Immutable.fromJS(action.payload))).set('showSuccess', true)
  },
  [actions.toLogin](state, action) {
    return state.set('error', null)
      .set('toLoginCountDownSeconds', action.payload)
  },
  [actions.registerFailed](state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  [actions.hideError](state) {
    return state.set('error', null).set('showSuccess', false)
  },
  [actions.reset]() {
    return Immutable.fromJS({
      data: {},
      loading: false,
      loaded: false,
      error: null,
      receiver: null,
      passwordStrength: null,
      passRobot: false
    })
  },
  [actions.setPasswordStrength](state, action) {
    return state.set('passwordStrength', action.payload)
  },
  [actions.passRobot](state, action) {
    return state.set('passRobot', action.payload)
  }
}, initialState)
