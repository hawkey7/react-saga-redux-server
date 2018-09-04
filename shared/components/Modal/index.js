/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRcode from 'qrcode.react'
import Copy from 'resources/icons/Copy'
import { connect } from 'react-redux'
import classNames from 'classnames'
import EtcIcon from 'resources/icons/EtcIcon'
import Notice from 'resources/icons/Notice'
import { Link } from 'react-router-dom'
import * as intlActions from 'actions/intl'
import * as bannerActions from 'actions/banner'
import messages from './messages.json'
import style from './style.css'

const banner = require('resources/images/bg.jpg')
const LeftCarousel = require('resources/images/left.png')
const RightCarousel = require('resources/images/right.png')

@connect(
  state => ({
    locale: state.intl.get('locale'),
    banner: state.banner
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...intlActions,
      ...bannerActions
    }, dispatch)
  })
)

export default class Modal extends Component<any, any> {
  constructor(props, context) {
    super(props, context)
    this.state = {
      copied: false
    }
    this.copy = this.copy.bind(this)
  }

  copy() {
    if (!this.state.copied) {
      this.setState({ copied: true })

      setTimeout(() => {
        this.setState({ copied: false })
      }, 2000)
    }
  }

  render () {
    const { Choose, Address, locale } = this.props
    return (
      <IntlProvider messages={messages[this.props.locale]}>
        <div className={style.forecast}>
          <div className={style.forecastTitle}>
            {/* <span className={classNames({ [style.triangleLeft]: false, [style.triangleRight]: true })} /> */}
            <EtcIcon />
            <div><FormattedMessage id="dtail_forecast_title" /></div>
            <div className={style.forecastChoose}><FormattedMessage id="detail_forecast_choose" />{Choose}</div>
            <div className={style.allMoney}><FormattedMessage id="detail_forecast_all" /></div>
          </div>
          <div className={style.withdrawAddress}>
            <div><FormattedMessage id="detail_forecast_address" /></div>
            <div className={style.address}>{Address}</div>
            <CopyToClipboard  text={Address} onCopy={this.copy}>
              {this.state.copied ? <button style={{ color: 'rgba(255, 255, 255, 1)' }}><FormattedMessage id="detail_forecast_copied" /></button> : <button><Copy /></button>}
            </CopyToClipboard>
            <div className={style.QRcode}>
              <QRcode value={Address} /></div>
          </div>
          <div className={style.notice}>
          <Notice />
            <FormattedMessage id="detail_forecast_notice" />
            {locale !== 'zh' && <div><FormattedMessage id="detail_forecast_notice_two" /></div>}
          </div>
        </div>
      </IntlProvider>
    )
  }
}
