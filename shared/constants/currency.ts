export const DECIMALPLACES = {
  BTC: 8,
  ETH: 4,
  ETC: 4,
  LTC: 8,
  XUC: 8
}

export const CURRENCIES: string[] = [
  'XUC',
  'BTC',
  'ETH',
  'LTC',
  'ETC'
]

export const MARKETS: string[] = [
  'ETH_BTC',
  'LTC_BTC',
  'ETC_BTC',
  'XUC_BTC',
  'LTC_ETH',
  'ETC_ETH',
  'XUC_ETH',
  'LTC_XUC',
  'ETC_XUC'
]

export const COLOR: any = {
  BTC: '#fdad2b',
  ETH: '#7c54f8',
  ETC: '#0ad98a',
  XUC: '#329afd',
  LTC: '#cecbcc'
}

export const TOTALMARKETS: string[] = [
  '*_BTC',
  '*_ETH',
  '*_XUC'
]

export const MARKETSLIST: any = {
  XUC: [
    'LTC_XUC',
    'ETC_XUC'
  ],
  BTC: [
    'ETH_BTC',
    'LTC_BTC',
    'ETC_BTC',
    'XUC_BTC'
  ],
  ETH: [
    'LTC_ETH',
    'ETC_ETH',
    'XUC_ETH',
  ]
}

export const MARKETS_DECIMALPLACES = {
  ETH_BTC: { base: 8, quote: 8, total: 8 },
  LTC_BTC: { base: 8, quote: 8, total: 8 },
  ETC_BTC: { base: 8, quote: 8, total: 8 },
  XUC_BTC: { base: 8, quote: 8, total: 8 },
  LTC_ETH: { base: 8, quote: 8, total: 8 },
  ETC_ETH: { base: 8, quote: 8, total: 8 },
  XUC_ETH: { base: 8, quote: 8, total: 8 },
  LTC_XUC: { base: 8, quote: 8, total: 8 },
  ETC_XUC: { base: 8, quote: 8, total: 8 }
}

export const FEES = {
  withdraw: {
    BTC: 0.003,
    ETH: 0.01,
    ETC: 0.01,
    LTC: 0.001,
    XUC: 0.01
  }
}
// TODO LTC_XUC
export const LIMITS = {
  withdraw: {
    BTC: 0.0025,
    ETH: 0.01,
    ETC: 0.01,
    LTC: 0.01,
    XUC: 0.5
  },
  trade: {
    ETH_BTC: 0.01,
    LTC_BTC: 0.01,
    ETC_BTC: 0.01,
    XUC_BTC: 0.1,
    BCH_ETH: 0.01,
    LTC_ETH: 0.01,
    ETC_ETH: 0.01,
    XUC_ETH: 0.1,
    LTC_XUC: 0.01,
    ETC_XUC: 0.01
  }
}

export const MAEKET_DEPTH = [
  '0.01',
  '0.0001',
  '0.000001',
  '0.00000001'
]

export const PUBLICK_API = [
  '/trade/contracts',
  '/trade/tickers',
  '/trade/candlesticks/',
  '/trade/orderbook/',
  '/trade/trades/'
]
