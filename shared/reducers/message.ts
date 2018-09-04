import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/message'

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  error: null,
  page: 0,
  messages: {
    data: {
      content: [],
      numberOfElements: 0,
      totalElements: 0
    },
    loading: false,
    loaded: false,
    error: null,
    canceling: false,
    cancelingOrderIds: [],
    cancelError: null,
    page: 0
  },
  status: {
    loading: false,
    loaded: false,
    error: null,
    result: null
  },
  toReaded: {
    loading: false,
    loaded: false,
    error: null
  },
  toDelete: {
    loading: false,
    loaded: false,
    error: null
  },
  detail: {
    id: '',
    loading: false,
    loaded: false,
    error: null,
    content: null
  },
  tip: {
    data: {},
    loading: false,
    loaded: false,
    error: null
  }
})

export default handleActions({
  [actions.getMessageListRequested](state) {
    return state.set('loading', true)
      .set('loaded', false)
      .set('error', null)
  },
  [actions.getMessageListSucceeded](state, action) {
    return state.update('messages', (v: any) => v.set('data', Immutable.fromJS(action.payload)).set('loading', false).set('loaded', true).set('error', null))
      .update('tip', (v: any) => v.update('data', (v: any) => v.set('unread', action.payload.unread)))
  },
  [actions.getMessageListFailed](state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('error', action.payload)
  },

  [actions.toReadedRequested](state) {
    return state.update('toReaded', (v: any) => v.set('loading', true)
      .set('loaded', false)
      .set('error', null)
    )
  },
  [actions.toReadedSucceeded](state) {
    return state.update('toReaded', (v: any) => v.set('loading', false)
      .set('loaded', true)
    )
  },
  [actions.toReadedFailed](state, action) {
    return state.update('toReaded', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('error', action.payload)
    )
  },

  [actions.toDeleteRequested](state) {
    return state.update('toDelete', (v: any) => v.set('loading', true)
      .set('loaded', false)
      .set('error', null)
    )
  },
  [actions.toDeleteSucceeded](state) {
    return state.update('toDelete', (v: any) => v.set('loading', false)
      .set('loaded', true)
    )
  },
  [actions.toDeleteFailed](state, action) {
    return state.update('toDelete', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('error', action.payload)
    )
  },
  [actions.getMessageDetailRequested](state, action) {
    return state.update('detail', (v: any) => v.set('id', action.payload)
      .set('loading', true)
      .set('loaded', false)
      .set('error', null)
      .set('content', null)
    )
  },
  [actions.getMessageDetailSucceeded](state, action) {
    return state.update('detail', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('content', action.payload)
    )
  },
  [actions.getMessageDetailFailed](state, action) {
    return state.update('detail', (v: any) => v.set('loading', false)
      .set('loaded', true)
      .set('error', action.payload)
    )
  },
  [actions.getTipMessageRequested](state) {
    return state.update('tip', (v: any) => v.set('loading', true)
      .set('loaded', false)
      .set('error', null)
    )
  },
  [actions.getTipMessageSucceeded](state, action) {
    return state.update('tip', (v: any) => v.set('data', Immutable.fromJS(action.payload))
      .set('loading', false)
      .set('loaded', true)
      .set('error', null)
    )
  },
  [actions.getTipMessageFailed](state, action) {
    return state.update('tip', (v: any) => v.set('loading', false)
      .set('loaded', false)
      .set('error', action.payload)
    )
  },
  [actions.closeMessageTip](state) {
    return state.update('tip', (v: any) => v.update('data', (v: any) => v.set('content', Immutable.fromJS([])))
      .set('loading', false)
      .set('loaded', false)
      .set('error', null)
    )
  },
  [actions.setPage](state, action) {
    return state.set('page', action.payload.page)
  }
}, initialState)
