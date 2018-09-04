import { createSelector } from 'reselect'

const tickerSelector = (state: RootState) => state.ticker
const marketSelector = (state: RootState) => state.market

export const getVisibleTicker = createSelector(
  tickerSelector,
  marketSelector,
  (ticker, market) => ticker.get('connected') && ticker.get('data').get(market.get('trade'))
)

export const getVisibleLastPrice = createSelector(
  tickerSelector,
  marketSelector,
  (ticker, market) => ticker.get('connected') && ticker.get('data').get(market.get('trade')) && ticker.get('data').get(market.get('trade')).get('last')
)
