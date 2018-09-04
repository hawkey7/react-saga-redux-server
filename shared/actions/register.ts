import { createAction } from 'redux-actions'

// export const getFlowId = createAction<RegisterParams>('register/GET_FLOW_ID')
// export const getFlowIdSuccess = createAction<any>('register/GET_FLOW_ID_SUCCESS')
// export const registerStep1Requested = createAction<RegisterStep1Params>('register/STEP1_REQUESTED')
// export const registerToStep2 = createAction<{}>('register/TO_STEP2')
// export const registerStep2Requested = createAction<RegisterStep2Params>('register/STEP2_REQUESTED')

export const postRegisterRequested = createAction<any>('register/POST_REGISTER_REQUESTED')
export const postRegisterSucceeded = createAction<any>('register/POST_REGISTER_SUCCEEDED')
export const postRegisterFailed = createAction<any>('register/POST_REGISTER_FAILED')

export const registerSucceeded = createAction<any>('register/REGISTER_SUCCEEDED')

export const toLogin = createAction<number>('register/TO_LOGIN')
export const registerFailed = createAction<ErrorMessage>('register/REGISTER_FAILED')

export const hideError = createAction('register/HIDE_ERROR')
export const setReceiver = createAction('register/SET_RECEIVER')
export const setPasswordStrength = createAction<number>('register/SET_PASSWORD_STRENGTH')
export const reset = createAction('register/RESET')

export const passRobot = createAction('register/PASS_ROBOT')
