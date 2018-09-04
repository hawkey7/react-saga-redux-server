/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { OLD_SITE_LINK } from 'constants/constants'
import Immutable from 'immutable'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CountDown from 'components/CountDown'
import { GAME_CATEGORY_ID, GAME_TYPE } from 'constants/constants'
import * as intlActions from 'actions/intl'
import * as queryListActions from 'actions/list'
import * as detailActions from 'actions/detail'
import classNames from 'classnames'
import Coin from 'resources/icons/Coin'
import Contdown from 'resources/icons/Contdown'
import ClosedStatus from 'resources/icons/ClosedStatus'
import PublishedStatus from 'resources/icons/PublishedStatus'
import HomeTeam from 'resources/icons/HomeTeam'
import VisTeam from 'resources/icons/VisTeam'
import Loading from 'components/Loading'
import messages from './messages.json'
import style from './style.css'

const NoData = require('resources/images/noData.png')
const VS = require('resources/images/vs.png')

@connect(
  state => ({
    locale: state.intl.get('locale'),
    queryLists: state.list,
    header: state.header
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...intlActions,
      ...queryListActions,
      ...detailActions,
      push
    }, dispatch)
  })
)

export default class Forecast extends Component {

  componentWillReceiveProps(nextProps) {
    const { locale, queryLists } = nextProps
    const { match } = this.props
    const status = queryLists.get('status')
    if (locale !== this.props.locale) {
      const type = match.params.type
      this.setState({
        screen: ''
      })
      if (type === 'SOCCER') {
        this.props.actions.getInitForecastListRequested({ status, categoryId: GAME_CATEGORY_ID.WORD_CUP, page: 0, size: 5, language: locale }) 
      }else if (type === "FUNNY_PREDICTION") {
        this.props.actions.getInitForecastListRequested({ status, guessType: GAME_TYPE.FUNNY_PREDICTION, page: 0, size: 5, language: locale, individual: true })
      }
   }
  }

  componentWillUnmount() {
    this.props.actions.changePages({ page: 0 })
    this.props.actions.changeStatus({ status: 'OPENING' })
  }

  gotoGuessDetail(id, guessType) {
    const type = this.props.match.params.type
    this.props.actions.push(`/${type}/${id}/${guessType}`)
  }

  changeScreenType(status) {
    const { locale } = this.props
    const type = this.props.match.params.type
    this.props.actions.changeStatus({ status: status })
    this.props.actions.changePages({ page: 0 })
    if (type === 'SOCCER') {
      this.props.actions.getInitForecastListRequested({ status, categoryId: GAME_CATEGORY_ID.WORD_CUP, page: 0, size: 5, language: locale }) 
    }else if (type === "FUNNY_PREDICTION") {
      this.props.actions.getInitForecastListRequested({ status, guessType: GAME_TYPE.FUNNY_PREDICTION, page: 0, size: 5, language: locale, individual: true })
    }
    this.props.actions.getQueryForecastListFailed()
  }

  render () {
    const { queryLists, header, locale } = this.props
    const nowTime = (new Date()).getTime()
    const queryList = queryLists && queryLists.get('data') && queryLists.get('data').get('content')
    const status = queryLists.get('status')
    const loading = queryLists.get('loading')
    const type = header.get('type')

    return (
      <IntlProvider messages={messages[this.props.locale]}>
        <div className={(queryList && queryList.size) > 2 ? style.forecast : style.forecast1}>
          <div className={style.forecastTop}>
            <div>{type === 'SOCCER' && <FormattedMessage id="content_bet_365" />}{type === 'FUNNY_PREDICTION' && <FormattedMessage id="content_coin_mark" />}</div>
            <a className={style.linkold} href={OLD_SITE_LINK} target="_blank"><FormattedMessage id="tip_link" /></a>
          </div>
          <div className={style.screen}>
            {/* <div className={status === '' ? style.checked : ''} onClick={this.changeScreenType.bind(this, '')}><FormattedMessage id="forcast_changeScreen_all" /></div> */}
            <button className={status === 'OPENING' ? style.checked : ''} disabled={loading} onClick={this.changeScreenType.bind(this, 'OPENING')}><FormattedMessage id="forcast_changeScreen_processing" /></button>
            <button className={status === 'CLOSED' ? style.checked : ''} disabled={loading} onClick={this.changeScreenType.bind(this, 'CLOSED')}><FormattedMessage id="forcast_changeScreen_close" /></button>
            <button className={status === 'PUBLISHED' ? style.checked : ''} disabled={loading} onClick={this.changeScreenType.bind(this, 'PUBLISHED')}><FormattedMessage id="forcast_changeScreen_publish" /></button>
          </div>
          {(queryList && !!queryList.size) ? <div className={style.overflow}>
            {queryList.map((item, index) => {
              const days = parseInt((item.get('closeTime') - nowTime) / 86400000)
              const hours = parseInt((item.get('closeTime') - nowTime - days * 86400000) / 3600000)
              const minutes = parseInt((item.get('closeTime') - nowTime - days * 86400000 - hours * 3600000) / 60000)
              const GameInfo = Immutable.fromJS(JSON.parse(item.get('gameInfo')))
              const ScoreInfo = Immutable.fromJS(JSON.parse(item.get('scoreInfo')))
              const homeTeamName = item.get('title') && String(item.get('title').split('VS')[0]).trim()
              const awayTeamName = item.get('title') && String(item.get('title').split('VS')[1]).trim()
              return(<div className={classNames({
                [style.forecastList]: true,
                [style.backColor]: index % 2 === 0
              })} onClick={this.gotoGuessDetail.bind(this, item.get('id'), item.get('guessType'))} key={Math.random()}>
                <div className={style.contentCenter}><span className={style.ETC}>ETC</span>|
                  <span
                    className={classNames({
                      [style.processing]: item.get('status') === 'OPENING',
                      [style.closing]: item.get('status') === 'CLOSED',
                      [style.lottering]: item.get('status') === 'PUBLISHED',
                    })}>
                    {item.get('status') === 'OPENING' && <FormattedMessage id="forcast_state_processing" />}
                    {item.get('status') === 'CLOSED' && <FormattedMessage id="forcast_state_closed" />}
                    {item.get('status') === 'PUBLISHED' && <FormattedMessage id="forcast_state_lottering" />}
                  </span>
                </div>
                <div className={style.forecastContent}>
                  <div className={style.content}>
                    {item.get('guessType') !== 'LOTTERY' ? <div className={style.contentTitle}>
                      <div>{item.get('title')}</div>
                      {/* {item.get('status') !== 'OPENING' && item.get('guessType') && <div>
                        <FormattedMessage id="forecast_game_time_last" />
                        <span>{ScoreInfo && parseInt((ScoreInfo.get('tm') % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}</span>
                        <span>’</span>
                      </div>} */}
                    </div> :
                    <div>
                      <div className={style.Image}>
                        {GameInfo && GameInfo.get('homeTeamBigUrl') ? <img src={GameInfo && GameInfo.get('homeTeamBigUrl')} alt="homeTeam" /> : <HomeTeam />}
                        <div>{homeTeamName}</div>
                      </div>
                      <div className={style.centerContent}>
                        <div className={style.twoTitle}>
                          <FormattedMessage id="forecast_title_wordcup" />
                          {GameInfo && GameInfo.get('round') && <span>{GameInfo.get('round')}</span>} 
                        </div>
                        {status !== 'OPENING' && <p><FormattedMessage id="detail_game_time" values={{ time: ScoreInfo && ScoreInfo.get('tm') ? ScoreInfo && ScoreInfo.get('tm') : '--' }} /></p>}
                        
                        {item.get('status') === 'OPENING' ? <img src={VS} alt="vs" /> :
                          <div className={style.closeTm}>
                            <span>{ScoreInfo && ScoreInfo.get('homeScore') ? ScoreInfo && ScoreInfo.get('homeScore') : '--'}</span>
                            <span>:</span>
                            <span>{ScoreInfo && ScoreInfo.get('awayScore') ? ScoreInfo && ScoreInfo.get('awayScore') : '--'}</span>
                          </div>
                        }
                        <div className={style.twoTime}>{GameInfo && GameInfo.get('gameStartTime') && moment(Number(GameInfo.get('gameStartTime'))).format('YYYY.MM.DD HH:mm:ss')}</div>
                      </div>
                      <div className={style.Image}>
                        {GameInfo && GameInfo.get('awayTeamBigUrl') ? <img src={GameInfo && GameInfo.get('awayTeamBigUrl')} alt="awayTeam" /> : <VisTeam />}
                        <div>{awayTeamName}</div>
                      </div>
                    </div>}
                  </div>
                </div>
                {item.get('status') === 'OPENING' && <div>
                  <div className={style.closeTime}><FormattedMessage id="detail_close_time" /></div>
                  <CountDown locale={this.props.locale} status={item.get('status')} time={item.get('closeTime')} />
                </div>}
                {item.get('status') === 'CLOSED' && <div>
                  <ClosedStatus />
                </div>}
                {item.get('status') === 'PUBLISHED' && <div>
                  <PublishedStatus />
                </div>}
              </div>)})}
          </div> :
          <div className={style.NoData}>
            {!loading && <div>
              <div><img alt="" src={NoData} /></div>
              <div><FormattedMessage id="detail_history_no_data" /></div>
            </div>}
          </div>
        }
          {loading && <Loading />}
        </div>
      </IntlProvider>
    )
  }
}
