import { createSelector } from 'reselect'

const meSelector = (state: RootState) => state.me

export const accountLoaded = createSelector(
  meSelector,
  me => me.get('loaded')
)

export const hasTradePassword = createSelector(
  meSelector,
  me => (me.get('loaded') && me.get('data').get('has_trade_password'))
)

export const kycLevelOnePassed = createSelector(
  meSelector,
  (me) => {
    const loaded = me.get('loaded')
    const kyc_info = me.get('data').get('kyc_info')
    const level = loaded ? kyc_info.get('level') : 0
    const status = loaded ? kyc_info.get('status') : null
    return (level === 1 && (status === 'PENDING' || status === 'APPROVED')) || level > 1
  }
)

export const kycLevelTwoPassed = createSelector(
  meSelector,
  (me) => {
    const loaded = me.get('loaded')
    const kyc_info = me.get('data').get('kyc_info')
    const level = loaded ? kyc_info.get('level') : 0
    const status = loaded ? kyc_info.get('status') : null
    return (level === 2 && status === 'APPROVED') || level > 2
  }
)

export const kycLevelTwoReviewing = createSelector(
  meSelector,
  (me) => {
    const loaded = me.get('loaded')
    const kyc_info = me.get('data').get('kyc_info')
    const level = loaded ? kyc_info.get('level') : 0
    const status = loaded ? kyc_info.get('status') : null
    return (level === 2 && status === 'PENDING')
  }
)
