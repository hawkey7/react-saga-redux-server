import React, { Component } from 'react'
import { IntlProvider, FormattedMessage } from 'react-intl'
import messages from './messages.json'
import style from './style.less'

interface Props {
  locale?: string,
  status?: string,
  detail?: boolean,
  time?: string
}

interface State {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

export default class CountDown extends Component<Props, State> {
  startTime: any
  timerId: any
  constructor (props: Props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentDidMount () {
    const { status, time } = this.props
    this.startTime = time
    if (status === 'OPENING' && time) {
      this.calculationCountDownTime()
      this.timerId = setInterval(() => {
        if (Number(time) < new Date().getTime()) {
          clearInterval(this.timerId)
          return
        }
        this.calculationCountDownTime()
      }, 60000)
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.time !== nextProps.time) {
      this.startTime = nextProps.time
      if (nextProps.status === 'OPENING' && nextProps.time) {
        this.calculationCountDownTime()
        clearInterval(this.timerId)
        this.timerId = setInterval(() => {
          if (Number(nextProps.time) < new Date().getTime()) {
            clearInterval(this.timerId)
            return
          }
          this.calculationCountDownTime()
        }, 60000)
      }
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }

  calculationCountDownTime () {
    const endTime = Number(this.startTime) - new Date().getTime()
    const seconds = Math.floor((endTime / 1000) % 60)
    const days = Math.floor(endTime / (1000 * 60 * 60 * 24))
    const hours = Math.floor((endTime / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((endTime / 1000 / 60) % 60)

    this.setState({
      days,
      hours,
      minutes,
      seconds
    })
  }

  render () {
    const { locale, status, detail } = this.props
    const { days, hours, minutes } = this.state
    return (
      <IntlProvider messages={messages[locale || 'zh']}>
        <div className={`${style.forecastTime} ${detail ? style.detail : ''}`}>
          <span className={style.number}>{status === 'OPENING' ? days : 0}</span>
          <FormattedMessage id="forcast_time_day" />
          <span className={style.number}>{status === 'OPENING' ? hours : 0}</span>
          <FormattedMessage id="forcast_time_hour" />
          <span className={style.number}>{status === 'OPENING' ? minutes : 0}</span>
          <FormattedMessage id="forcast_time_minite" />
        </div>
      </IntlProvider>
    )
  }
}
