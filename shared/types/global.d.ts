// types

declare type ErrorMessage = string

declare type Locale = 'en' | 'zh' | 'ko' | 'ja' | 'ru' | 'vi' | 'zh-Hant'

declare type TradeSide = 'buy' | 'sell'

declare type Market = 'ETH_BTC' | 'ETC_BTC' | 'BCH_BTC' | 'ETC_BTC' | 'LTC_BTC' | 'XUC_BTC' | 'ETC_ETH' | 'BCH_ETH' | 'ETC_ETH' | 'LTC_ETH' | 'XUC_ETH' | 'ETC_XUC' | 'BCH_XUC' | 'ETC_XUC' | 'LTC_XUC'

declare type TradeType = 'limit' | 'market' | 'instant'

declare type GrandType = 'oauth2_login' | 'password' | 'refresh_token'

declare type Currency = 'CNY' | 'BTC' | 'LTC' | 'ETH' | 'ETC' | 'BCH' | 'XUC'

declare type HistoryType = 'DEPOSIT' | 'WITHDRAWAL'

declare type FetchMethod = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE'

declare const TradingView: any

declare const Datafeeds: any

// interfaces

declare interface TickerFeed {
  msgType: 'TickerFeed'
  timestamp: number
  market: Market
  last: string | null
  ask: string | null
  bid: string | null
}

declare interface OrderBookFeed {
  msgType: 'OrderBookFeed'
  timestamp: number
  market: Market
  asks: Array<{ price: string, quantity: string }> | null
  bids: Array<{ price: string, quantity: string }> | null
}

declare interface CandlestickBase {
  msgType: 'CandlestickBase'
  type: string
  candlesticks: CandlestickFeed[]
}

declare interface CandlestickFeed {
  msgType: 'CandlestickFeed'
  market: string
  type: string
  close: number
  high: number
  low: number
  open: number
  timestamp: number
  volume: number
}

declare interface MarketQuery {
  market: Market | '*'
}

declare interface TickerQuery {
  market: Market | '*'
  type: string
}

declare interface HistoryTypeQuery {
  type: HistoryType
}

declare interface Config {
  ENV: string
  GATEWAY_API_URL: string
  WEBSOCKET_API_URL: string
  WECHAT_APP_ID: string
  QQ_APP_ID: string
}

declare interface RootState {
  router?: any
  form?: any
  modal?: any
  ui?: any
  intl: any
  auth: any
  me: any
  balance: any
  ticker: any
  lastPrice: any
  orderbook: any
  register: any
  kycLevelOne: any
  kycLevelTwo: any
  trade: any
  order: any
  history: any
  password: any
  tradePassword: any
  flowId: any
  captcha: any
  vcode: any
  socket: any
  wallet: any
  withdraw: any
  deposit: any
  volume: any
  market: any
  securitySetting: any
  securityPolicy: any
  proChart: any
  proOrderbook: any
  orderDetail: any
  address: any
}

declare interface FetchOptions {
  headers: object
  method: FetchMethod
  body?: string | FormData
}

declare interface Window {
  __PRELOADED_STATE__?: string
  __PRELOADED_CHUNKS__?: string[]
  __IP_LOCATION__?: string
  addSpecialListener: any
  Intl?: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  tvWidget?: any,
  noCaptcha?: any
}

declare interface Process extends NodeJS.Process {
  release: {
    name: string
  }
}

declare interface NodeModule {
  hot?: any
}

declare interface HTMLHeadElement {
  append: any
}

// modules

declare module '*.css' {
  const styles: any
  export = styles
}

declare module '*.less' {
  const styles: any
  export = styles
}

declare module '*.png' {
  const file: any
  export = file
}

declare module '*.jpg' {
  const file: any
  export = file
}

declare module '*.gif' {
  const file: any
  export = file
}

declare module '*.json' {
  const file: any
  export = file
}

declare module '*messages' {
  const file: any
  export = file
}

declare module '*production' {
  const config: Config
  export = config
}

declare module 'constants/env' {
  const config: Config
  export = config
}

declare module 'transit-immutable-js' {
  const transit: any
  export = transit
}

declare module 'redux-form/es/immutable' {
  interface Form {
    reducer: any
    change: any
    reset: any
    stopSubmit: any
  }

  const form: Form
  export = form
}

declare module 'react-cookie' {
  const cookie: any
  export = cookie
}

declare module 'isomorphic-fetch' {
  const fetch: any
  export = fetch
}

declare module 'intl' {
  const file: any
  export = file
}

declare module 'intl/locale-data/jsonp/en.js' {
  const file: any
  export = file
}

declare module 'intl/locale-data/jsonp/zh.js' {
  const file: any
  export = file
}

declare module 'intl/locale-data/jsonp/ja.js' {
  const file: any
  export = file
}

declare module 'intl/locale-data/jsonp/ko.js' {
  const file: any
  export = file
}

declare module 'intl/locale-data/jsonp/ru.js' {
  const file: any
  export = file
}

declare module 'reducers' {
  const file: any
  export = file
}

declare module 'sagas' {
  const file: any
  export = file
}

declare module 'routes/async' {
  interface Bundles {
    [key: string]: any
  }

  const bundles: Bundles
  export = bundles
}

declare module 'react-native-vector-icons/Ionicons' {
  const file: any
  export = file
}

declare module 'react-native-svg' {
  interface Svg extends React.ComponentClass<any> {
    Path: any
  }

  const svg: Svg
  export = svg
}

declare module 'react-native-extended-stylesheet' {
  const file: any
  export = file
}

declare module 'qrcode.react' {
  const file: any
  export = file
}

declare module 'react-copy-to-clipboard' {
  const file: any
  export = file
}

declare module 'react-click-outside' {
  const file: any
  export = file
}

declare module 'react-fastclick' {
  const file: any
  export = file
}