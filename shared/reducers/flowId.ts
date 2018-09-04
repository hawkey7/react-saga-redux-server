import { handleActions } from 'redux-actions'
import * as actions from 'actions/flowId'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  usage: '',
  data: {},
  loading: false,
  loaded: false,
  error: null,
  flowId: null
})

export default handleActions({
  [actions.getFlowIdRequested] (state) {
    return state.set('loaded', false)
      .set('loading', true)
  },
  [actions.getFlowIdSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
  },
  [actions.getFlowIdFailed] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('error', action.payload)
  },
  [actions.getFlowId](state) {
    return state.set('error', null)
  },
  [actions.getFlowIdSuccess](state, action) {
    return state.set('flowId', action.payload.flowId)
      .set('error', null)
  },
}, initialState)
