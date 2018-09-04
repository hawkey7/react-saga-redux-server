/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, reduxForm } from 'redux-form/es/immutable'
import { FormContainer, FieldItem, ServerError, ServerResult } from 'components/Form'
import { BaseInputVcode, BaseInputItems } from 'components/Form/frontBaseForm'
import { NormalField, VcodeField } from 'components/FieldTemplate'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
import Spinner from 'resources/icons/Spinner'
import * as tradePasswordActions from 'actions/securitySetting'
import * as flowIdActions from 'actions/flowId'
import * as vcodeActions from 'actions/vcode'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import ArrowGrayIcon from 'resources/icons/ArrowGrayIcon'
import ArrowGreenIcon from 'resources/icons/ArrowGreenIcon'
import SuccessGreen from 'resources/icons/SuccessGreen'
import { normalizeVcode, normalizeTradePassword } from 'utils/normalize'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])
const checkValidReceiver = receiver => (/^\w+(\.\w+)*@\w+(\.\w+)+$/.test(receiver))

const validate = (values) => {
  const errors = {}

  if (!values.get('vcode')) {
    errors.vcode = 'input_validate_empty_validation_code'
  }

  if (!values.get('newAssetPassword')) {
    errors.newAssetPassword = 'input_validate_empty_trade_password'
  }

  if (!values.get('confirm_new_trade_password')) {
    errors.confirm_new_trade_password = 'input_validate_empty_trade_password'
  }

  if (values.get('newAssetPassword') !== values.get('confirm_new_trade_password')) {
    errors.confirm_new_trade_password = 'input_validate_mismatch'
  }

  return errors
}

@connect(
  state => ({
    changeTradePassword: state.securitySetting.get('forgotTradePassword'),
    captcha: state.captcha,
    locale: state.intl.get('locale'),
    flowId: state.flowId,
    vcode: state.vcode,
    me: state.me
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...tradePasswordActions,
      ...flowIdActions,
      ...vcodeActions
    }, dispatch)
  })
)

@reduxForm({ form: 'changeTransactionPasswordForm', validate })

export default class ChangeTradePasswordForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
    // this.getVcodeStatus = this.getVcodeStatus.bind(this)
  }

  componentDidMount() {
    this.props.actions.getFlowIdRequested({ usage: 'modify-asset-password' })
  }

  sendVcode() {
    const { locale } = this.props
    const Email = this.props.me.get('data').get('email')
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading') && checkValidReceiver(Email)) {
      this.props.actions.sendVCodeRequested({ receiver: Email, usage: 'modify-asset-password', language: locale })
    }
  }

  getVcodeStatus(vcode) {
    const vcodeError = vcode.get('error')
    const showVcodeSuccess = vcode.get('showSuccess')

    let vcodeStatus = null
    if (showVcodeSuccess) {
      vcodeStatus = <div><CheckIcon /><FormattedMessage id="input_send_success" /></div>
    } else if (vcodeError && typeof vcodeError === 'object') {
      vcodeStatus = <div><DeleteIcon /><FormattedMessage id={vcodeErrorMessages(vcodeError.message)} /></div>
    }
    return vcodeStatus
  }

  submit(data) {
    const Step = this.props.changeTradePassword.get('step')
    let Data
    if (Step === 2) {
      Data = data.delete('confirm_new_trade_password').delete('vcode').toJS()
    } else {
      Data = data.delete('confirm_new_trade_password').toJS()
    }
    const submitData = {
      formData: Data,
      step: Step,
      flowId: this.props.flowId.get('data').get('flowId')
    }
    this.props.actions.forgotTradePasswordRequested(submitData)
  }

  cancel() {
    this.props.actions.hideChangeTradePasswordForm()
  }

  render() {
    const { changeTradePassword, invalid, pristine, handleSubmit, locale, vcode } = this.props
    const error = changeTradePassword.get('error')
    const loading = changeTradePassword.get('loading')
    const showSuccess = changeTradePassword.get('showSuccess')
    const disabled = invalid || loading || pristine
    const step = changeTradePassword.get('step')
    const countDownSeconds = vcode.get('forgotTradePassword').get('countDownSeconds')
    const vcodeRequesting = vcode.get('forgotTradePassword').get('loading')
    const vcodeStatus = this.getVcodeStatus(vcode.get('forgotTradePassword'))
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={`${locale === 'ru' ? style.ru : ''} ${style.changeTradePasswordForm}`}>
          <FormContainer center>
            <form className={style.form} onSubmit={handleSubmit(this.submit)}>
              <div className={isMobile ? style.MobileGuide : style.guide}>
                <div className={style.green}>
                  <div />
                  <FormattedMessage id="change_transaction_passpord_step_one_get_email" />
                </div>
                <div className={style.svg}>
                  <ArrowGreenIcon />
                </div>
                <div>
                  <div className={step >= 2 ? style.green : style.gray}>
                    <div />
                    <FormattedMessage id="change_transaction_passpord_step_two_reset_password" />
                  </div>
                </div>
                <div>{step > 2 ? <div className={style.svg}><ArrowGreenIcon /></div> : <div className={style.svg}><ArrowGrayIcon /></div>}</div>
                <div>
                  <div className={step === 3 ? style.green : style.gray}>
                    <div />
                    <FormattedMessage id="change_transaction_passpord_step_two_reset_success" />
                  </div>
                </div>
              </div>
              {step === 1 && <Field
                name="vcode"
                type="text"
                component={isMobile ? VcodeField : BaseInputVcode}
                locale={locale}
                placeholder={messages[locale].input_validate_empty_validation_code}
                label={<FormattedMessage id="change_password_label_validation_code" />}
                normalize={normalizeVcode}
                disabled={vcodeRequesting || !!countDownSeconds}
                countDownSeconds={countDownSeconds}
                loading={vcodeRequesting}
                sendVcode={this.sendVcode}
                status={vcodeStatus}
                custom={true}
              />}
              {step === 2 && <div>
                <Field
                  name="newAssetPassword"
                  type="password"
                  component={isMobile ? NormalField : BaseInputItems}
                  placeholder={messages[locale].input_withdraw_password}
                  label={<FormattedMessage id="change_password_label_new_password" />}
                  normalize={normalizeTradePassword}
                  custom={true}
                />
                <Field
                  name="confirm_new_trade_password"
                  type="password"
                  component={isMobile ? NormalField : BaseInputItems}
                  placeholder={messages[locale].input_withdraw_password_confirm}
                  label={<FormattedMessage id="change_password_label_confirm_new_password" />}
                  normalize={normalizeTradePassword}
                  custom={true}
                />
              </div>}
              <FieldItem withoutLabel>
                <div className={style.buttonGroup}>
                  {step < 3 && <button type="button" onClick={this.cancel} disabled={loading}><FormattedMessage id="input_cancel" /></button>}
                  {step < 3 && <button type="submit" disabled={disabled}>
                    {loading ? <Spinner /> : (step === 2 ? <FormattedMessage id="input_success" /> : <FormattedMessage id="input_next_step" />)}
                  </button>}
                </div>
              </FieldItem>
              {step === 3 && <div>
                <div className={style.SuccessGreen}>
                  <SuccessGreen />
                  <FormattedMessage id="withdraw_password_change_success" />
                </div>
              </div>}
              {step < 3 && <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>}
              {error && typeof error === 'object' && <FieldItem withoutLabel><ServerError><FormattedMessage id={errorMessages(error.message)} /></ServerError></FieldItem>}
              {showSuccess && step < 3 && <FieldItem withoutLabel><ServerResult><FormattedMessage id="input_success" /></ServerResult></FieldItem>}
            </form>
          </FormContainer>
        </div>
      </IntlProvider>
    )
  }
}
