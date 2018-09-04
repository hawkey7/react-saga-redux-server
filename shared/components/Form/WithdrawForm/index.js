/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, reduxForm, formValueSelector, change, reset } from 'redux-form/es/immutable'
import { FormContainer, FieldItem, ServerError, ServerResult } from 'components/Form'
import { BaseInputItems, BaseInputVcode } from 'components/Form/frontBaseForm'
import { normalizeVcode, normalizeUnitByCurrency, normalizeAddress } from 'utils/normalize'
import { errorMessages, mergeMessages, vcodeErrorMessages } from 'utils/errorMessage'
import { ReqExp } from 'constants/regexp'
import Spinner from 'resources/icons/Spinner'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import * as actions from 'actions/withdraw'
import * as vcodeActions from 'actions/vcode'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

// const amountLength = receiver => (/^([1-9]\d{0,15}|0)(\.\d{1,4})?$/.test(receiver))

const validate = (values, props) => {
  const errors = {}

  if (!values.get('addressTo')) {
    errors.addressTo = 'withdraw_form_address_focus'
  } else if (!ReqExp.ETC_WITHDRAW_ADDRESS.test(values.get('addressTo')) || values.get('addressTo').length < 42) {
    errors.addressTo = 'withdraw_address_invalid'
  }

  if (!values.get('amount')) {
    errors.amount = 'withdraw_form_no_amount_focus'
  } else if (+values.get('amount') > (Number(props.me.get('balances').get(props.account.get('currency')).get('available')) - 0.01)) {
    errors.amount = 'withdraw_form_amount_too_big'
  }

  if (!values.get('tradePassword')) {
    errors.tradePassword = 'withdraw_form_password_focus'
  }

  if (!values.get('vcode')) {
    errors.vcode = 'withdraw_form_vcode_focus'
  }

  return errors
}

@connect(
  state => ({
    securitySetting: state.securitySetting,
    vcode: state.vcode,
    locale: state.intl.get('locale'),
    amount: formValueSelector('withdrawForm')(state, 'amount'),
    withdraw: state.withdraw,
    me: state.me,
    account: state.account
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...vcodeActions,
      change,
      reset
    }, dispatch)
  })
)

// @reduxForm({ form: 'withdrawForm', validate, asyncValidate: validateEmail, asyncBlurFields: ['email'] })
@reduxForm({ form: 'withdrawForm', validate })

export default class WithdrawForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      Amount: 0,
      sendEmail: false,
      judgeSendEmail: false
    }

    this.submit = this.submit.bind(this)
    this.close = this.close.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
    this.closeSpecialPopup = this.closeSpecialPopup.bind(this)
  }

  componentDidMount() {
    this.props.actions.getWithdrawFeeRequested({ currency: this.props.account.get('currency') })
  }

  componentWillReceiveProps() {
    const error = this.props.withdraw.get('error')
    if (error && error.get('message').get('error') === 'WITHDRAW_EXCEED_LIMIT' && !this.state.judgeSendEmail) {
      this.setState({
        sendEmail: true
      })
    }
  }

  close() {
    this.props.actions.closeLoading()
  }

  closeSpecialPopup() {
    this.props.reset('withdrawForm')
    this.setState({
      sendEmail: false,
      judgeSendEmail: true
    })
  }

  sendVcode() {
    const { locale } = this.props
    const Email = this.props.me.get('data').get('email')
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading')) {
      this.props.actions.sendVCodeRequested({ receiver: Email, usage: 'withdraw-email', language: locale })
    }
  }

  getVcodeStatus(vcode) {
    const vcodeError = vcode.get('error')
    const showVcodeSuccess = vcode.get('showSuccess')

    let vcodeStatus = null
    if (showVcodeSuccess) {
      vcodeStatus = <div><CheckIcon /><FormattedMessage id="input_send_success" /></div>
    } else if (vcodeError) {
      vcodeStatus = <div><DeleteIcon /><FormattedMessage id={vcodeErrorMessages(vcodeError.message)} /></div>
    }
    return vcodeStatus
  }

  submit(data) {
    this.setState({
      Amount: this.props.amount
    })
    this.props.actions.postWtihdrawRequested(data.set('currency', this.props.account.get('currency')).toJS())
  }

  render() {
    const { invalid, pristine, handleSubmit, locale, vcode, withdraw, me, account } = this.props
    const error = withdraw.get('error')
    const loading = false
    const success = withdraw.get('success')
    const disabled = invalid || loading || pristine
    const countDownSeconds = vcode.get('withdrawSec').get('countDownSeconds')
    const vcodeRequesting = vcode.get('withdrawSec').get('loading')
    const vcodeStatus = this.getVcodeStatus(vcode.get('withdrawSec'))
    const fee = withdraw.get('account').get('data').get('fee')
    const currency = account.get('currency')
    const loaded = withdraw.get('loaded')
    const Account = Number(me.get('balances').get(currency).get('available') - 0.01) > 0 ? Number(me.get('balances').get(currency).get('available') - 0.01).toFixed(4) : 0

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={`${locale === 'ru' ? style.ru : ''} ${style.withdrawForm}`}>
          <FormContainer>
            <form className={style.form} onSubmit={handleSubmit(this.submit)}>
              <Field
                name="addressTo"
                type="text"
                component={BaseInputItems}
                placeholder={messages[locale].withdraw_form_address_focus}
                label={<FormattedMessage id="withdraw_form_address" />}
                normalize={normalizeAddress}
              />
              <Field
                name="amount"
                type="text"
                component={BaseInputItems}
                normalize={normalizeUnitByCurrency(currency)}
                fee={fee + currency || '--'}
                currency={currency}
                placeholder={`${messages[locale].withdraw_form_amount_most}${Account}${currency}`}
                // toFee={this.toFee}
                label={<FormattedMessage id="withdraw_form_amount" />}
              />
              <Field
                name="tradePassword"
                type="password"
                component={BaseInputItems}
                placeholder={messages[locale].withdraw_form_password_focus}
                label={<FormattedMessage id="withdraw_form_password" />}
                custom={true}
                normalize={normalizeVcode}
              />
              <Field
                name="vcode"
                type="text"
                locale={locale}
                component={BaseInputVcode}
                placeholder={messages[locale].withdraw_form_vcode_focus}
                label={<FormattedMessage id="withdraw_form_vcode" />}
                normalize={normalizeVcode}
                disabled={vcodeRequesting || !!countDownSeconds}
                loading={vcodeRequesting}
                countDownSeconds={countDownSeconds}
                sendVcode={this.sendVcode}
                custom={true}
                status={vcodeStatus}
              />
              <FieldItem withoutLabel>
                <div className={style.buttonGroup}>
                  <button type="submit" disabled={disabled}>{loading ? <Spinner /> : <FormattedMessage id="withdraw_form_confirm" />}</button>
                  <div className={(locale === 'vi' || locale === 'ru') ? style.oneRem : style.special}>
                    <FormattedMessage id="withdraw_form_special_apply" />
                    <div className={style.specialApply}>
                      <div className={style.specialTop}>
                        <div>
                          <FormattedMessage id="withdraw_form_special_hover_content_one" values={{ currency, amount: currency === 'ETH' ? 100 : 500 }} />
                          <span className={style.greenWord}>support@coingame.org</span>
                          <FormattedMessage id="withdraw_form_special_hover_content_three" />
                        </div>
                        <div><FormattedMessage id="withdraw_form_special_hover_content_apply_modal" /></div>
                      </div>
                      <div className={style.specialBottom}>
                        <div className={style.applyTitle}><FormattedMessage id="withdraw_form_apply_modal_title" /></div>
                        <div>
                          <div><FormattedMessage id="withdraw_form_apply_modal_content_one" /></div>
                          <div><FormattedMessage id="withdraw_form_apply_modal_content_two" /></div>
                          <div><FormattedMessage id="withdraw_form_apply_modal_content_three" values={{ currency, amount: currency === 'ETH' ? 100 : 500 }} /></div>
                          <div><FormattedMessage id="withdraw_form_apply_modal_content_four" /></div>
                          <div><FormattedMessage id="withdraw_form_apply_modal_content_five" /></div>
                        </div>
                        <div className={style.applyTime}><FormattedMessage id="withdraw_form_apply_modal_content_bottom" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FieldItem>
              <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>
              {error && error.get('message').get('error') !== 'WITHDRAW_EXCEED_LIMIT' && <FieldItem withoutLabel><ServerError><FormattedMessage id={errorMessages(error && error.get('message').get('error'))} values={{ time: error && error.get('message').get('details').get(0) }} /></ServerError></FieldItem>}
              {success && <FieldItem withoutLabel><ServerResult><FormattedMessage id="withdraw_form_success" /></ServerResult></FieldItem>}
            </form>
            {loaded &&
            <div className={style.overPage}>
              <div>
                <div className={style.popupTitle}><FormattedMessage id="withdraw_form_apply" /></div>
                <div className={style.popup}>
                  <div><FormattedMessage id="withdraw_form_money" /><span>{this.state.Amount}</span>{currency || '--'}</div>
                  <div><FormattedMessage id="withdraw_form_fee_title" /><span>{fee || '--'}</span>{currency || '--'}</div>
                </div>
                <div className={style.popupButton}><button className={style.Button} onClick={this.close}><FormattedMessage id="withdraw_form_confirm2" /></button></div>
              </div>
            </div>
            }
            {this.state.sendEmail &&
            <div className={style.overPageTwo}>
              <div>
                <div className={style.popupTitle}><FormattedMessage id="withdraw_form_apply" /></div>
                <div className={style.specialPopup}>
                  <div>
                    <FormattedMessage id="withdraw_form_special_popup_one" values={{ currency, amount: currency === 'ETH' ? 100 : 500 }} />
                    <span className={style.greenWord}><FormattedMessage id="withdraw_form_special_popup_two" /></span>
                    <FormattedMessage id="withdraw_form_special_popup_three" />
                    <span className={style.greenWord}>support@coingame.org</span>
                    <FormattedMessage id="withdraw_form_special_popup_four" />
                  </div>
                  <div className={style.specialBottom}>
                    <div className={style.applyTitle}><FormattedMessage id="withdraw_form_apply_modal_title" /></div>
                    <div>
                      <div><FormattedMessage id="withdraw_form_apply_modal_content_one" /></div>
                      <div><FormattedMessage id="withdraw_form_apply_modal_content_two" /></div>
                      <div><FormattedMessage id="withdraw_form_apply_modal_content_three" values={{ currency, amount: currency === 'ETH' ? 100 : 500 }} /></div>
                      <div><FormattedMessage id="withdraw_form_apply_modal_content_four" /></div>
                      <div><FormattedMessage id="withdraw_form_apply_modal_content_five" /></div>
                    </div>
                    <div className={style.applyTime}><FormattedMessage id="withdraw_form_apply_modal_content_bottom" /></div>
                  </div>
                </div>
                <div className={style.popupButton}><button className={style.Button} onClick={this.closeSpecialPopup}><FormattedMessage id="withdraw_form_I_know" /></button></div>
              </div>
            </div>
            }
          </FormContainer>
        </div>
      </IntlProvider>
    )
  }
}
