import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { GAME_TYPE } from 'constants/constants'
import CurrencyIcon from 'resources/icons/CurrencyIcon'
import WordCupIcon from 'resources/icons/WordCup'
import EsportsIcon from 'resources/icons/EsportsIcon'
import messages from './messages.json'
import style from './style.less'

interface Props {
  locale?: string,
  title?: string,
  match?: any
}

interface State {
  type: string
}

export default class CountDown extends Component<Props, State> {
  startTime: any
  timerId: any
  constructor (props: Props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    const { locale, match, title } = this.props
    const game = match.params.game
    return (
      <IntlProvider messages={messages[locale || 'zh']}>
        <div className={style.breadCrumbs}>
          <div className={style.left}>
            <span>
            {String(game).toLocaleUpperCase() === GAME_TYPE.FUNNY_PREDICTION && <CurrencyIcon />}
            {String(game).toLocaleUpperCase() === GAME_TYPE.SOCCER && <WordCupIcon />}
            {String(game).toLocaleUpperCase() === GAME_TYPE.ESPORTS && <EsportsIcon />}
            </span>
            <NavLink className={style.link} to={`/home/list/${game}`} ><FormattedMessage id={game.toLowerCase()} /></NavLink>
            <span>{title}</span>
          </div>
        </div>
      </IntlProvider>
    )
  }
}
