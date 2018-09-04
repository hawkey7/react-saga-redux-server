/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { STATIC_CN_IMG_PATH } from 'constants/constants'
import * as intlActions from 'actions/intl'
import * as bannerActions from 'actions/banner'
import * as headerActions from 'actions/header'
import ETHCurrencyIcon from 'resources/icons/ETHCurrencyIcon'
import ETCCurrencyIcon from 'resources/icons/ETCCurrencyIcon'
import messages from './messages.json'
import style from './style.css'

const LeftCarousel = require('resources/images/left.png')
const RightCarousel = require('resources/images/right.png')
const banner_six = require('resources/images/banner_six.png')
const banner_seven = require('resources/images/banner_seven.png')
const banner_eight = require('resources/images/banner_eight.png')
const StepOne = require('resources/images/step_number1.png')
const StepTwo = require('resources/images/step_number2.png')
const StepThree = require('resources/images/step_number3.png')

const bannerEN_one = require('resources/images/banner1_en.png')
const bannerEN_two = require('resources/images/banner2_en.png')
const bannerEN_three = require('resources/images/banner3_en.png')
const bannerEN_four = require('resources/images/banner4_en.png')

@connect(
  state => ({
    locale: state.intl.get('locale'),
    ipLocation: state.intl.get('ipLocation'),
    banner: state.banner,
    loggedIn: state.auth.get('loggedIn')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...intlActions,
      ...bannerActions,
      ...headerActions,
      push
    }, dispatch)
  })
)

export default class Banner extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      index: 1
    }
    this.LeftCarousel = this.LeftCarousel.bind(this)
    this.RightCarousel = this.RightCarousel.bind(this)
    this.onGotoGuide = this.onGotoGuide.bind(this)
  }

  componentDidMount() {
    const { locale } = this.props
    this.props.actions.getOrderSumRequested()
    this._intervalBanner = setInterval(() => {
      this.RightCarousel(locale)
    }, 5000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.setState({
        index: 1
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this._intervalBanner)
  }

  LeftCarousel(locale = 'zh') {
    const imgNumber = locale === 'en' || locale === 'ru' || locale === 'vi' ? 4 : 3
    if (this.state.index === 1) {
      this.setState({
        index: imgNumber
      })
    } else {
      this.setState({
        index: this.state.index - 1
      })
    }
  }

  RightCarousel(locale = 'zh') {
    const imgNumber = locale === 'en' || locale === 'ru' || locale === 'vi' ? 4 : 3
    if (this.state.index === imgNumber) {
      this.setState({
        index: 1
      })
    } else {
      this.setState({
        index: this.state.index + 1
      })
    }
  }

  onGotoGuide(type, step) {
    this.props.actions.push(`/home/guide/${step}?type=${type}&random=${(Math.random() * 10000).toFixed(5)}`)
  }

  render () {
    const { banner, locale, ipLocation, loggedIn } = this.props
    const ETHSum = banner.get('totalPrizes').get('data').get('eth')
    const ETCSum = banner.get('totalPrizes').get('data').get('etc')
    return (
      <IntlProvider messages={messages[this.props.locale]}>
        <div className={style.banner}>
          <div className={style.orderSum}>
            <div className={style.sumContent}>
              <FormattedMessage id="banner_order_title" />
              <div className={style.sumAmount}><ETHCurrencyIcon />{ETHSum !== null && ETHSum !== undefined ? <FormattedNumber value={Number(ETHSum)} /> : '--'}<span>ETH</span></div>
              <div className={style.sumAmount}><ETCCurrencyIcon />{ETCSum !== null && ETCSum !== undefined ? <FormattedNumber value={Number(ETCSum)+5336.8833} /> : '--'}<span>ETC</span></div>
            </div>
          </div>
          {locale === 'en' || locale === 'ru' || locale === 'vi' ?
            <div className={style.container}>
              <img className={classNames({ [style.activeIn]: this.state.index - 1 === 0, [style.activeOut]: this.state.index - 1 !== 0 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner1_en.png` : bannerEN_one} alt="" />
              <img className={classNames({ [style.activeIn]: this.state.index - 1 === 1, [style.activeOut]: this.state.index - 1 !== 1 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner2_en.png` : bannerEN_two} alt="" />
              <img className={classNames({ [style.activeIn]: this.state.index - 1 === 2, [style.activeOut]: this.state.index - 1 !== 2 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner3_en.png` : bannerEN_three} alt="" />
              <img className={classNames({ [style.activeIn]: this.state.index - 1 === 3, [style.activeOut]: this.state.index - 1 !== 3 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner4_en.png` : bannerEN_four} alt="" />
            </div> : <div className={style.container}>
            <img className={classNames({ [style.activeIn]: this.state.index - 1 === 0, [style.activeOut]: this.state.index - 1 !== 0 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner_six.png` : banner_six} alt="" />
            <img className={classNames({ [style.activeIn]: this.state.index - 1 === 1, [style.activeOut]: this.state.index - 1 !== 1 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner_seven.png` : banner_seven} alt="" />
            <img className={classNames({ [style.activeIn]: this.state.index - 1 === 2, [style.activeOut]: this.state.index - 1 !== 2 })} src={ipLocation === 0 ? `${STATIC_CN_IMG_PATH}/banner_eight.png` : banner_eight} alt="" />
          </div>}
          <div className={style.position}>
            <div className={style.Button}>
              <div onClick={this.LeftCarousel.bind(this, locale)} className={style.LeftCarousel}><img alt="" src={LeftCarousel} /></div>
              <div onClick={this.RightCarousel.bind(this, locale)} className={style.RightCarousel}><img alt="" src={RightCarousel} /></div>
            </div>
          </div>
          <div className={style.Step}>
            <div>
              <button onClick={this.onGotoGuide.bind(this, loggedIn ? 'vip' : 'nor', 1)}>
                <div><img src={StepOne} alt="step1"/></div>
                <div className={style.bannerWord}><FormattedMessage id={loggedIn ? 'guide_step_one_vip' : 'guide_step_one'} /></div>
              </button>
              <button onClick={this.onGotoGuide.bind(this, loggedIn ? 'vip' : 'nor', 2)}>
                <div><img src={StepTwo} alt="step2"/></div>
                <div className={style.bannerWord}><FormattedMessage id={loggedIn ? 'guide_step_two_vip' : 'guide_step_one'} /></div>
              </button>
              <button onClick={this.onGotoGuide.bind(this, loggedIn ? 'vip' : 'nor', 3)}>
                <div><img src={StepThree} alt="step3"/></div>
                <div className={style.bannerWord}><FormattedMessage id={loggedIn ? 'guide_step_three_vip' : 'guide_step_three'} /></div>
              </button>
            </div>
          </div>
        </div>
      </IntlProvider>
    )
  }
}
