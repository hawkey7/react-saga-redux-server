import cookie from 'react-cookie'
import { GATEWAY_API_URL } from 'constants/env'
import { isMobile } from 'utils/platform'
import { PUBLICK_API } from 'constants/currency'

if (!isMobile) require('isomorphic-fetch')

export const fetchBase = (method: FetchMethod = 'GET', endPoint: string = '/hello', params: any = {}, language: string = 'zh', customeHeaders: object = {}, backError: string = 'oneString') => {
  let url = GATEWAY_API_URL + endPoint
  const token = (!isMobile && cookie.load('game_t')) ? `Bearer ${cookie.load('game_t')}` : null

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
    'Accept-Language': language,
    ...customeHeaders
  }

  PUBLICK_API.map((item: string) => {
    if (endPoint.toLowerCase().indexOf(item.toLowerCase()) !== -1) delete headers['Authorization'] // tslint:disable-line
  })

  const options: any = { method, headers }

  if (method === 'GET') {
    const queryString: string = `${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    if (queryString) url += '?' + queryString
    if (!!params.individual) url += '&categoryId=2&categoryId=3'
  } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']
      const formData = new FormData()
      Object.keys(params).forEach(key => formData.append(key, params[key]))
      options.body = formData
    } else {
      options.body = JSON.stringify(params)
    }
  }

  return fetch(url, options).then((res: any) => {
    if (!res.ok) {
      if (res.status === 401 && !window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }

      if (backError === 'oneString') {
        return res.json().then((e: any) => Promise.reject({ message: e.error }))
      } else {
        return res.json().then((e: any) => Promise.reject({ message: e }))
      }
    }

    const contentType = res.headers.get('content-type')

    if (/json/.test(contentType)) {
      return res.json()
    }
    if (/text/.test(contentType)) {
      return res.text()
    }
    if (/image\/png/.test(contentType)) {
      return res.blob().then((blob: string) => URL.createObjectURL(blob))
    }
    return null
  })
}

export const queryForecastList = (params: any) => fetchBase('GET', '/forecasts/web', { ...params }, params.language)

export const getForecastDetail = ({ id, language }: { id: number, language: string }) => fetchBase('GET', `/forecasts/web/${id}`, {}, language)

export const getBanner = ({ language }: {language: string}) => fetchBase('GET', '/banners/web', {}, language)

export const getHistory = ({ optionAddress }: {optionAddress: string}) => fetchBase('GET', `/forecasts/web/record/${optionAddress}`)

export const getRewordHistory = (params: any) => fetchBase('GET', '/forecasts/orders/searchWinOrders', params)

export const getOrderSum = () => fetchBase('GET', '/forecasts/orders/sum')

export const oauth = (params: object) => fetchBase('POST', '/uaa/oauth/token', params, '', { Authorization: 'Basic YnJvd3Nlcjo=', 'Content-Type': 'application/x-www-form-urlencoded' }, 'offString')

export const logout = () => fetchBase('PUT', '/uaa/oauth/logout')

export const validateToken = (params: object) => fetchBase('GET', '/uaa/oauth/check_token', params, '', { Authorization: 'Basic YnJvd3Nlcjo=' })

export const vaildateData = (params: {}, usage: string) => fetchBase('GET', `/profile/${usage}/existence`, params)

export const getFlowId = (params: any) => fetchBase('GET', `/flow/${params.usage}`)

export const changeNickName = (params: ChangeNicknameParams) => fetchBase('PUT', '/profile/nickname', params)

export const changeEmail = (params: ChangeEmailParams) => fetchBase('PUT', '/profile/email', params)

export const sendVCode = ({ receiver, usage, flowId, language }: { receiver: string, usage: string, flowId: string, language: string }) => fetchBase('POST', `/vcode/${usage}`, { receiver }, language === 'zh' ? 'zh-CN' : language, { 'X-Flow-ID': flowId })

export const getPreferences = () => fetchBase('GET','/preferences/')

export const forgotPassword = (params: ForgotPasswordParams) => fetchBase('POST', `/forgot-password/step${params.step}`, params.formData, '', { 'X-Flow-ID': params.flowId })

export const forgotTradePassword = (params: { step: number, flowId: string, formData: any }) => fetchBase('POST', `/profile/asset-password/step${params.step}`, params.formData, '', { 'X-Flow-ID': params.flowId })

export const changePassword = ({ oldPassword, newPassword, vcode, language }: { oldPassword: any, newPassword: any, vcode: any, language: any }) => fetchBase('PUT', '/profile/password', { oldPassword, newPassword, vcode }, language === 'zh' ? 'zh-CN' : language)

// export const getWalletAddress = (params: any) => fetchBase('GET', `/profile/${params}/address`)

export const getAccountInfo = () => fetchBase('GET', '/profile')

export const register = (params: object) => fetchBase('POST', '/register', params)

// export const registerStep1Request = (params: RegisterStep1Params) => fetchBase('POST', '/register/step1', params.formData, '', { 'x-flow-id': params.flowId })

// export const registerStep2Request = (params: RegisterStep2Params) => fetchBase('POST', '/register/step2', params.formData, '', { 'x-flow-id': params.flowId })

export const setTradePassword = (params: object) => fetchBase('POST', '/profile/asset-password', params)

export const getMessageList = ({ language, page, size }: { language: string, page: any, size: any }) => fetchBase('GET', '/messages', { page, size }, language)

// export const getMessageStatus = () => fetchBase('GET', '/users/messages/statistics')

export const getMessageDetail = (params: any) => fetchBase('GET', `/messages/${params.id}`, {}, params.language)

export const readMessage = (params: any) => fetchBase('PUT', '/messages', params)

export const deleteMessage = (params: any) => fetchBase('DELETE', '/messages', params)

export const postWithdraw = (params: any) => fetchBase('POST', '/withdraw/apply', params, '', {}, 'offString')

export const getWithdrawFee = (params: any) => fetchBase('GET', `/withdraw/${params.currency}/fee`)

export const getProfileIncome = (params: any) => fetchBase('GET', '/profile/balance/income', params)

export const getProfileOutcome = (params: any) => fetchBase('GET', '/expenses/list', params)

export const getForcastorderList = (params: any) => fetchBase('GET', '/forecasts/searchMyPredict', params)

export const quickBets = (params: any) => fetchBase('POST', '/forecasts/quickBetting', { ...params })

export const getOutComeDetail = (params: any) => fetchBase('GET', '/forecasts/outComeDetail', params)

export const getInComeDetail = (params: any) => fetchBase('GET', '/forecasts/inComeDetail', params)

export const getNotice = (language: string) => fetchBase('GET', '/proclamations/web', {}, language)

export const queryOptions = ({ id, language }: {id: any, language: any}) => fetchBase('GET', `/forecasts/web/options?${id}`, {}, language)

export const multBet = (params: any) => fetchBase('POST', '/forecasts/bet/betting', { ...params })
