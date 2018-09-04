export const CURRENCY = [
  ''
]

export const OPTIONS_TAG = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const GAME_TYPE = {
  WORLD_CUP: 'WORLD_CUP',
  DIGITAL_CURRENCY: 'DIGITAL_CURRENCY',
  FUNNY_PREDICTION: 'FUNNY_PREDICTION',
  FUNNY_GUESSING: 'FUNNY_GUESSING',
  USER_CENTER: 'USER_CENTER',
  SOCCER: 'SOCCER',
  ESPORTS: 'ESPORTS'
}

export const GUESS_TYPE = {
  GUESSING: 'GUESSING', // 竞猜
  LOTTERY: 'LOTTERY', // 博彩
  HANDICAP: 'HANDICAP', // 让平半
  FUNNY_PREDICTION: 'FUNNY_PREDICTION',
  FUNNY_GUESSING: 'FUNNY_GUESSING',
}

export const GAME_CATEGORY_ID = {
  WORD_CUP: 4,
  DIGITAL_CURRENCY: 6,
  ESPORTS: 19
}

export const GUESS_STATUS = {
  OPENING: 'OPENING', // 竞猜中
  CLOSED: 'CLOSED', // 已截止
  PUBLISHED: 'PUBLISHED' // 已开奖
}

export const GAME_CATEGORY = {
  VICTORY: 'VICTORY', // 胜负平
  LET: 'LET', // 让球
  BALLS: 'BALLS' // 大小球
}

export const GAME_CATEGORY_TAG = {
  VICTORY: '1_1', // 胜负平
  LET: '1_2', // 让球
  BALLS: '1_3', // 大小球
  MATCHWINNER: 'MATCHWINNER',
  WIN_DRAW_LOSE: 'WIN_DRAW_LOSE'
}

export const GAME_MARKET = {
  VICTORY: '1_1', // 胜负平
  LET: '1_2', // 让球
  BALLS: '1_3', // 大小球
  MATCHWINNER: 'MATCHWINNER',
  WIN_DRAW_LOSE: 'WIN_DRAW_LOSE'
}

export const FORECAST_OPTIONS_TAG = {
  HOME: 'homeOd',
  AWAY: 'awayOd',
  DRAW: 'drawOd',
  OVER: 'overOd',
  UNDER: 'underOd'
}

export const OPTION_TAG = {
  HOME: 'homeOd',
  AWAY: 'awayOd',
  DRAW: 'drawOd',
  OVER: 'overOd',
  UNDER: 'underOd'
}

export const AMOUNT_LIMIT = {
  UNLIMITED: 999999999,
  MAX: 9999999,
  MIN: 0.5
}

export const BETS_LIMIT = {
  ETH: {
    MAX: 5000,
    MIN: 0.2
  },
  ETC: {
    MAX: 9999999,
    MIN: 0.5
  }
}

export const DEFAULT_CURRENCY = 'ETC'

export const OLD_SITE_LINK = 'https://old.coingame.org/'

export const BETS_MODE = {
  NORMAL: 'NORMARL',
  QUICK: 'QUICK'
}

export const LANG_LIST = [
  'zh',
  'en',
  'ko',
  'ja',
  'ru',
  'vi',
  'zh-Hant'
]

export const LANG = {
  zh: '简体中文',
  en: 'English',
  ko: '한국어',
  ja: '日本语',
  ru: 'русский',
  vi: 'Tiếng Việt',
  'zh-Hant': '繁體中文'
}

export const CURRENCY_LIST = [
  'ETH',
  'ETC'
]

export const CURRENCY_TYPE = {
  ETC: 'ETC',
  ETH: 'ETH'
}

export const QUICK_BETS_GEAR = {
  ETC: {
    one: [1, 2, 5, 10],
    two: [1, 20, 50, 100],
    three: [10, 200, 500, 1000]
  },
  ETH: {
    one: [0.2, 0.4, 0.8, 1],
    two: [0.2, 2, 5, 10],
    three: [1, 20, 50, 100]
  }
}

export const LIMIT_BETS = 0.5

export const STATIC_CN_IMG_PATH = 'https://istatic.coingame.org/images'

export const EMAIL_CONFIG = {
  zh: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  en: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  ko: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  ja: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  ru: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  vi: {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  },
  'zh-Hant': {
    contact: 'support@coingame.org',
    marking: 'marketing@coingame.org'
  }
}
