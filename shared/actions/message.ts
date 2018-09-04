import { createAction } from 'redux-actions'

export const getMessagesStatusRequested = createAction('message/GET_MESSAGES_STATUS_REQUESTED')
export const getMessagesStatusSucceeded = createAction<any>('message/GET_MESSAGES_STATUS_SUCCEEDED')
export const getMessagesStatusFailed = createAction<any>('message/GET_MESSAGES_STATUS_FAILED')

export const getMessageListRequested = createAction<any>('message/GET_MESSAGE_LIST_REQUESTED')
export const getMessageListSucceeded = createAction<any>('message/GET_MESSAGE_LIST_SUCCEEDED')
export const getMessageListFailed = createAction<any>('message/GET_MESSAGE_LIST_FAILED')

export const toReadedRequested = createAction<string>('message/TO_READED_REQUESTED')
export const toReadedSucceeded = createAction('message/TO_READED_SUCCEEDED')
export const toReadedFailed = createAction<any>('message/TO_READED_FAILED')

export const toDeleteRequested = createAction<string>('message/TO_DELETE_REQUESTED')
export const toDeleteSucceeded = createAction('message/TO_DELETE_SUCCEEDED')
export const toDeleteFailed = createAction<any>('message/TO_DELETE_FAILED')

export const getMessageDetailRequested = createAction<string>('message/GET_MESSAGE_DETAIL_REQUESTED')
export const getMessageDetailSucceeded = createAction<any>('message/GET_MESSAGE_DETAIL_SUCCEEDED')
export const getMessageDetailFailed = createAction<{}>('message/GET_MESSAGE_DETAIL_Failed')

export const getTipMessageRequested = createAction('message/GET_TIP_MESSAGE_REQUESTED')
export const getTipMessageSucceeded = createAction<any>('message/GET_TIP_MESSAGE_SUCCEEDED')
export const getTipMessageFailed = createAction<any>('message/GET_TIP_MESSAGE_FAILED')

export const closeMessageTip = createAction<any>('message/CLOSE_MESSAGE_TIP')

export const setPage = createAction<any>('message/SET_PAGE')
