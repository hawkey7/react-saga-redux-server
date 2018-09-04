import { createAction } from 'redux-actions'

export const getFlowIdRequested = createAction('flowId/GET_FLOW_ID_REQUESTED')
export const getFlowIdSucceeded = createAction<FlowIdResult>('flowId/GET_FLOW_ID_SUCCEEDED')
export const getFlowIdFailed = createAction<ErrorMessage>('flowId/GET_FLOW_ID_FAILED')

export const getFlowId = createAction<RegisterParams>('register/GET_FLOW_ID')
export const getFlowIdSuccess = createAction<FlowIdResult>('register/GET_FLOW_ID_SUCCESS')
