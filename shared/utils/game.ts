import { GUESS_STATUS } from 'constants/constants'

export const checkActive = (data: any, currency: string, supportCurrentCurrency: any, betCurrency: string) => {
  if (!(data || currency)) return false
  const openGame = data.filter((item: any) => item.get('status') === GUESS_STATUS.OPENING)
  if (openGame.size >= 2) {
    return betCurrency === currency && supportCurrentCurrency.includes(currency)
  } else if (openGame.size < 2 && openGame.size >= 1) {
    return openGame.get(0).get('currency') === currency
  } else {
    return false
  }
}

export const checkDisable = (data: any, currency: string) => {
  if (!data) return true
  const openGame = data.filter((item: any) => item.get('status') === GUESS_STATUS.OPENING)
  if (openGame.size >= 2) {
    return false
  } else if (openGame.size < 2 && openGame.size >= 1) {
    return openGame.get(0).get('currency') !== currency
  }
  return true
}

export const setDefaultCurrency = (data: any, defaultBetCurrency: string) => {
  if (!data) return
  const openGame = data.filter((item: any) => item.get('status') === GUESS_STATUS.OPENING)
  if (openGame.size >= 2) {
    return defaultBetCurrency
  } else if (openGame.size < 2 && openGame.size >= 1) {
    return openGame.get(0).get('currency')
  }
  return
}

export const setTipMessage = (data: any, currency: string) => {
  if (!data) return
  const game = data.filter((item: any) => item.get('currency') === currency)
  if (game.size > 0 && game.get(0).get('status') !== GUESS_STATUS.OPENING) {
    return 3
  } else {
    return 1
  }
  return
}

export const getGuessInfo = (guessInfo: any): GuessInfo => {
  if (!guessInfo) return {}
  return guessInfo as GuessInfo
}

export const getGameInfo = (gameInfo: any): GameInfo => {
  if (!gameInfo) return {}
  return JSON.parse(gameInfo) as GameInfo
}

export const getScoreInfo = (scoreInfo: any): ScoreInfo => {
  if (!scoreInfo) return {}
  return JSON.parse(scoreInfo) as ScoreInfo
}

export const getSubGames = (subgames: any, currency: string): GameMarket[] => {
  const gameList = subgames && subgames.filter((item: any) => item.currency === currency) as GameMarket[]

  if (gameList && gameList.length > 0) {
    return gameList
  }

  return []
}

export const getGamesByMarket = (subgames: any, market: string): GameMarket[] => {
  const gamesList = subgames && subgames.filter((item: any) => item.market === market) as GameMarket[]

  if (gamesList && gamesList.length > 0) {
    return gamesList
  }

  return []
}
