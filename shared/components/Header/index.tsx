/* @jsx */
/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import ClickOutside from 'react-click-outside'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import DropDownIcon from 'resources/icons/DropDownIcon'
import { LANG, LANG_LIST, GAME_TYPE, CURRENCY_LIST } from 'constants/constants'
import UserIcon from 'resources/icons/FormUser'
import CloseIcon from 'resources/icons/CloseIcon'
import ETHCircularIcon from 'resources/icons/ETHCircularIcon'
import ETCCircularIcon from 'resources/icons/ETCCircularIcon'
import * as intlActions from 'actions/intl'
import * as meActions from 'actions/me'
import * as authActions from 'actions/auth'
import * as messageActions from 'actions/message'
import messages from './messages.json'
import style from './style.less'

const Logo = require('resources/images/logo_new.png')

const contryImage = (locale: string = 'zh') => {
  if (!LANG_LIST.includes(locale)) {
    locale = 'zh'
  }
  return require(`resources/images/${locale}Contry.png`)
}

const isFunGuessingActive = (match?: any, location?: any) => {
  if (!location && !match) {
    return false
  }
  return location.pathname.includes(`/detail/${GAME_TYPE.FUNNY_PREDICTION}`) || location.pathname.includes(`/list/${GAME_TYPE.FUNNY_PREDICTION}`)
}

const isWordCupActive = (match?: any, location?: any) => {
  if (!location && !match) {
    return false
  }
  return location.pathname.includes(`/detail/${GAME_TYPE.SOCCER}`) || location.pathname.includes(`/list/${GAME_TYPE.SOCCER}`)
}
const isESportsActive = (match?: any, location?: any) => {
  if (!location && !match) {
    return false
  }
  return location.pathname.includes(`/detail/${GAME_TYPE.ESPORTS}`) || location.pathname.includes(`/list/${GAME_TYPE.ESPORTS}`)
}

export interface State {
  locale: string
  addHeaderBg: boolean
  showGuide: boolean
  dropdownMenuStatus: {
    language?: boolean
    currency?: boolean
    user?: boolean
  }
}

@connect(
  state => ({
    locale: state.intl.get('locale'),
    auth: state.auth,
    message: state.message,
    defaultBetCurrency: state.me.get('defaultBetCurrency')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...intlActions,
      ...authActions,
      ...messageActions,
      ...meActions,
      push
    }, dispatch)
  })
)

export default class Header extends Component<any, State> {
  firstMes: number = 0
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      locale: '',
      addHeaderBg: false,
      showGuide: false,
      dropdownMenuStatus: {
        language: false,
        currency: false,
        user: false
      }
    }
    this.onSetHeaderBg = this.onSetHeaderBg.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
    this.onCloseMessageTip = this.onCloseMessageTip.bind(this)
    this.onSetLanguage = this.onSetLanguage.bind(this)
    this.onSetDefaultBetCurrency = this.onSetDefaultBetCurrency.bind(this)
    this.onSetDropdownMenuStatus = this.onSetDropdownMenuStatus.bind(this)
    this.onHideGuide = this.onHideGuide.bind(this)
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onSetHeaderBg)
    const locationBetCurrency = JSON.parse(localStorage.getItem('ETCGAME_DEFAULT_BET_CURRENCY') || '{}')
    if (locationBetCurrency.currency && locationBetCurrency.time && Number(locationBetCurrency.time) + 604800000 >= new Date().getTime()) {
      this.props.actions.setDefaultBetCurrency(locationBetCurrency.currency)
    }
    if (localStorage.getItem('ETC_GAME_LOOK_GUIDE') !== '0') {
      this.setState({
        showGuide: true
      })
    }
    if (this.props.auth.get('loggedIn') && !window.location.pathname.includes('/message-center')) {
      this.props.actions.getTipMessageRequested(this.props.locale)
    }
  }

  componentWillReceiveProps(nextProps: any) {
    const pathname = window.location.pathname
    const result = pathname === '/assets-center' || pathname === '/user-center' || pathname === '/register' || pathname.indexOf('/message-center') === 0
    const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop
    if (result || scrollTop > 50) {
      this.setState({
        addHeaderBg: true
      })
    } else {
      this.setState({
        addHeaderBg: false
      })
    }

    if ((this.props.auth.get('loggedIn') || nextProps.auth.get('loggedIn')) && !window.location.pathname.includes('/message-center') && (this.props.locale !== nextProps.locale || this.firstMes === 0)) {
      this.firstMes += 1
      nextProps.actions.getTipMessageRequested(nextProps.locale)
    }
  }

  onSetHeaderBg() {
    const pathname = window.location.pathname
    const result = pathname === '/assets-center' || pathname === '/user-center' || pathname === '/register' || pathname.indexOf('/message-center') === 0
    const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop
    if (result || scrollTop > 50) {
      if (!this.state.addHeaderBg) {
        this.setState({
          addHeaderBg: true
        })
      }
      return
    } else {
      if (this.state.addHeaderBg) {
        this.setState({
          addHeaderBg: false
        })
      }
      return
    }
  }

  onSetDefaultBetCurrency(currency: string) {
    this.onSetDropdownMenuStatus('currency')
    this.props.actions.setDefaultBetCurrency(currency)
  }

  onSetLanguage(locale: string) {
    this.onSetDropdownMenuStatus('language')
    this.props.actions.setLocale(locale)
    this.props.actions.setAgreeServiceStatus(false)
  }

  onSetDropdownMenuStatus (menu: any, isClose = true) {
    if (menu !== 'language' && menu !== 'currency' && menu !== 'user') return false
    this.setState({
      dropdownMenuStatus: {
        ...this.state.dropdownMenuStatus,
        [menu]: isClose ? false : !this.state.dropdownMenuStatus[menu]
      }
    })
    if (menu === 'user') {
      const tipMessage = this.props.message.get('tip').get('data').get('content')
      if (tipMessage && tipMessage.size > 0 && !tipMessage.get(0).get('isRead')) return
      this.onCloseMessageTip(undefined)
    }
  }

  onLogOut() {
    this.props.actions.logout()
  }

  onCloseMessageTip(id?: any) {
    this.props.actions.closeMessageTip()
    if (id && String(id).trim().length > 0) {
      this.props.actions.push(`/message-center/${id}`)
    }
  }

  onHideGuide() {
    this.setState({
      showGuide: false
    })
    localStorage.setItem('ETC_GAME_LOOK_GUIDE', '0')
  }

  render () {
    const { locale, auth, message, defaultBetCurrency } = this.props
    const addHeaderBg = this.state.addHeaderBg
    const loggedIn = auth.get('loggedIn')
    const tipMessage = message.get('tip').get('data').get('content')
    const unread = message.get('tip').get('data').get('unread')

    return (
      <IntlProvider messages={messages[locale]}>
        <header className={classNames({ [style.header]: true, [style.activeBg]: addHeaderBg })}>
         <div className={style.content}>
          <div className={style.left}>
            <NavLink to={`/home/list/${GAME_TYPE.SOCCER}`}  className={style.logo}><img src={Logo} alt="logo" /></NavLink>
            <NavLink to={`/home/list/${GAME_TYPE.SOCCER}`}  isActive={isWordCupActive} activeClassName={style.active}><FormattedMessage id="header_title_word_cup" /></NavLink>
            <NavLink to={`/home/list/${GAME_TYPE.ESPORTS}`} isActive={isESportsActive} activeClassName={style.active}><FormattedMessage id="esports" /></NavLink>
            <NavLink to={`/home/list/${GAME_TYPE.FUNNY_PREDICTION}`}  isActive={isFunGuessingActive} activeClassName={style.active}><FormattedMessage id="funny_guessing" /></NavLink>
          </div>
          <div className={style.right}>
            <ClickOutside onClickOutside={this.onSetDropdownMenuStatus.bind(this, 'currency')}>
                <div className={style.changeCurrency}>
                  <div onClick={this.onSetDropdownMenuStatus.bind(this, 'currency', false)} className={classNames({ [style.currency]: true, [style.itemBarOn]: !this.state.dropdownMenuStatus.currency })}>
                    {defaultBetCurrency === 'ETH' ? <ETHCircularIcon /> : <ETCCircularIcon />}
                    <span className={style.text}>{defaultBetCurrency}</span>
                    <span className={style.svg}><DropDownIcon /></span>
                  </div>
                  {this.state.dropdownMenuStatus.currency && <ul className={style.currencyPadding}>
                    {CURRENCY_LIST.map((item: string) => {
                      if (defaultBetCurrency !== item) {
                        return <li key={item} onClick={this.onSetDefaultBetCurrency.bind(this, item)}>
                          {item === 'ETH' ? <ETHCircularIcon /> : <ETCCircularIcon />}<span  className={style.text}>{item}</span>
                        </li>
                      }
                    })}
                  </ul>}
                </div>
              </ClickOutside>
              {loggedIn && <NavLink to="/assets-center" activeClassName={style.active}><FormattedMessage id="header_assets_center" /></NavLink>}
              {loggedIn && <div className={style.userMain}>
                <ClickOutside onClickOutside={this.onSetDropdownMenuStatus.bind(this, 'user')}>
                  <div onClick={this.onSetDropdownMenuStatus.bind(this, 'user', false)} className={style.user}>
                    <UserIcon />
                    {
                      this.state.dropdownMenuStatus.user &&
                      <div className={style.dropdown}>
                        <NavLink to="/user-center"><FormattedMessage id="header_account_center" /></NavLink>
                        <NavLink to="/message-center" className={style.unread}><FormattedMessage id="header_message_center" />{Number(unread) > 0 && <span className={style.unreadTip} />}</NavLink>
                        <a onClick={this.onLogOut}><FormattedMessage id="header_Login_out" /></a>
                      </div>
                    }
                  </div>
                </ClickOutside>
                {
                  tipMessage && tipMessage.size > 0 && !tipMessage.get(0).get('isRead') &&
                  <div className={style.message}>
                    <span className={style.arrow} />
                    <button onClick={this.onCloseMessageTip.bind(this, null)}><CloseIcon /></button>
                    <p>{`${tipMessage.get(0).get('title').trim().length > 50 ? `${String(tipMessage.get(0).get('title')).substring(0, 50)}...` : tipMessage.get(0).get('title').trim()}`}<a onClick={this.onCloseMessageTip.bind(this, tipMessage.get(0).get('id'))} ><FormattedMessage id="header_see_detail" /></a></p>
                  </div>
                }
              </div>}
              {!loggedIn && <NavLink to="/login" activeClassName={style.active}><FormattedMessage id="header_login" /></NavLink>}
              {!loggedIn && <NavLink to="/register" className={style.register} activeClassName={style.active}><FormattedMessage id="header_register" /></NavLink>}
              <ClickOutside onClickOutside={this.onSetDropdownMenuStatus.bind(this, 'language')}>
                <div className={style.changeLanguage}>
                  <div onClick={this.onSetDropdownMenuStatus.bind(this, 'language', false)} className={classNames({ [style.language]: true, [style.itemBarOn]: !this.state.dropdownMenuStatus.language })}>
                    <img src={contryImage(locale)} />
                    <DropDownIcon />
                  </div>
                  {this.state.dropdownMenuStatus.language && <ul className={style.currencyPadding}>
                    {LANG_LIST.map((item: string) => {
                      if (locale !== item) {
                        return <li key={item} onClick={this.onSetLanguage.bind(this, item)}><img src={contryImage(item)} /><span>{LANG[item]}</span></li>
                      }
                    })}
                  </ul>}
                </div>
              </ClickOutside>
            </div>
            {this.state.showGuide && <div className={style.guide}>
                <div>
                  <p><FormattedMessage id="bets_currency_tip" /></p>
                  <button onClick={this.onHideGuide}><FormattedMessage id="i_konw" /></button>
                </div>
            </div>}
         </div>
        </header>
      </IntlProvider>
    )
  }
}
