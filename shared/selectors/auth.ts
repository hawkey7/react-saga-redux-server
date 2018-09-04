export const needCaptchaFromServer = (state: RootState) => state.auth.get('error') === '01006' || state.auth.get('error') === '01005'
export const needGaCodeFromServer = (state: RootState) => state.auth.get('error') === '01008'
export const needRefreshCaptchaFromServer = (state: RootState) => state.auth.get('error') === 403
