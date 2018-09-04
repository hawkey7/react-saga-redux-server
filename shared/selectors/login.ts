export const needCaptchaFromServer = (state: any) => state.login.get('error') === '01006' || state.login.get('error') === '01005'
export const needGaCodeFromServer = (state: any) => state.login.get('error') === '01008'
export const needRefreshCaptchaFromServer = (state: any) => state.login.get('error') === 403
