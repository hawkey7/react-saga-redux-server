import { createSelector } from 'reselect'

const openOrderSelector = (state: RootState) => state.order.get('open')
const closedOrderSelector = (state: RootState) => state.order.get('closed')
const marketSelector = (state: RootState) => state.market

export const getOpenOrders = createSelector(
  [openOrderSelector, marketSelector],
  (order: any, market: any) => order.set('data', order.get('data').get(market.get('trade')))
)

export const getClosedOrders = createSelector(
  [closedOrderSelector, marketSelector],
  (order: any, market: any) => order.set('data', order.get('data').get(market.get('trade')))
)
