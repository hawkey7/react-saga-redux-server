import { createSelector } from 'reselect'

const orderbookSelector = (state: RootState) => state.orderbook
const proOrderbookelector = (state: RootState) => state.proOrderbook
const marketSelector = (state: RootState) => state.market

export const getVisibleOrders = createSelector(
  orderbookSelector,
  marketSelector,
  (orderbook, market) => {
    const currenctMarket: Market = market.get('trade')
    const data: any = orderbook.get('data').get(currenctMarket)

    let asks = data.get('asks')
    let bids = data.get('bids')

    if (asks.size > 5) {
      asks = asks.slice(0, 5)
    }

    if (bids.size > 5) {
      bids = bids.slice(0, 5)
    }

    return data.set('asks', asks).set('bids', bids)
  }
)

export const getProVisibleOrders = createSelector(
  proOrderbookelector,
  marketSelector,
  (orderbook, market) => {
    const currenctMarket: Market = market.get('trade')
    const data: any = orderbook.get('data').get(currenctMarket)

    let asks = data.get('asks')
    let bids = data.get('bids')

    if (asks.size > 10) {
      asks = asks.slice(0, 10)
    }

    if (bids.size > 10) {
      bids = bids.slice(0, 10)
    }

    return data.set('asks', asks).set('bids', bids)
  }
)
