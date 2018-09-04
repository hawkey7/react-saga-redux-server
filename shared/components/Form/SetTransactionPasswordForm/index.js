/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, reduxForm } from 'redux-form/es/immutable'
import { FieldItem, ServerError } from 'components/Form'
import { errorMessages, mergeMessages } from 'utils/errorMessage'
import { PasswordField } from 'components/Form/frontBaseForm'
import Spinner from 'resources/icons/Spinner'
import * as tradePasswordActions from 'actions/tradePassword'
import * as vcodeActions from 'actions/vcode'
import { normalizeTradePassword } from 'utils/normalize'
import validateMessages from 'utils/validateMessages'
import LockAIcon from 'resources/icons/FormLockA'
import LockIcon from 'resources/icons/FormLock'
import SuccessGreen from 'resources/icons/SuccessGreen'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const validate = (values) => {
  const errors = {}

  if (!values.get('assetPassword')) {
    errors.assetPassword = 'input_validate_empty_trade_password'
  } else if (values.get('assetPassword').length !== 6) {
    errors.assetPassword = 'input_validate_error_trade_password'
  }

  if (values.get('assetPassword') !== values.get('confirm_trade_password')) {
    errors.confirm_trade_password = 'input_validate_mismatch_trade_password'
  }

  return errors
}

@reduxForm({ form: 'setTransactionPasswordForm', validate })

@connect(
  state => ({
    tradePassword: state.tradePassword.get('setTradePassword'),
    me: state.me,
    vcode: state.vcode,
    countDownSeconds: state.vcode.get('countDownSeconds'),
    locale: state.intl.get('locale')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...tradePasswordActions,
      ...vcodeActions
    }, dispatch)
  })
)

export default class SetTransactionPasswordForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
  }

  componentWillUnmount() {
    this.props.actions.hideSetTradePasswordError()
  }

  submit(data) {
    this.props.actions.setTradePasswordRequested(data.delete('confirm_trade_password').toJS())
  }

  render() {
    const { tradePassword, invalid, pristine, handleSubmit, locale } = this.props
    const error = tradePassword.get('error')
    const loading = tradePassword.get('loading')
    const disabled = invalid || loading || pristine
    const showSuccess = tradePassword.get('showSuccess')
    const toHomeCountDownSeconds = tradePassword.get('toHomeCountDownSeconds')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={style.firseSetTradePasswordForm}>
          {!showSuccess && <div className={style.title}><FormattedMessage id="first_set_password_title" /></div>}
          <form className={style.form} onSubmit={handleSubmit(this.submit)}>
            {!showSuccess && <div>
              <Field
                name="assetPassword"
                type="password"
                component={PasswordField}
                placeholder={messages[locale].input_transaction_asset_password}
                normalize={normalizeTradePassword}
                leftSymbol={<LockAIcon />}
              />
              <Field
                name="confirm_trade_password"
                type="password"
                component={PasswordField}
                placeholder={messages[locale].input_transaction_asset_password_repeat}
                normalize={normalizeTradePassword}
                leftSymbol={<LockIcon />}
              />
              <div className={style.submitBtn}>
                <button type="submit" disabled={disabled}>
                  {loading ? <Spinner /> : <FormattedMessage id="input_completed" />}
                </button>
              </div>
              <div className={style.focus}><FormattedMessage id="first_set_password_focus" /></div>
            </div>}
            {
              showSuccess &&
                <div className={style.successWrap}>
                  <SuccessGreen />
                  <div>
                    <FormattedMessage id="modify_asset_password_success" />
                    <span className={style.time}>{toHomeCountDownSeconds}S</span>
                    <FormattedMessage id="input_sign_up_notice" />
                  </div>
                </div>
            }
            {error && typeof error === 'object' &&
            <FieldItem withoutLabel>
              <ServerError>
                <FormattedMessage id={errorMessages(error.message)} />
              </ServerError>
            </FieldItem>
            }
          </form>
        </div>
      </IntlProvider>
    )
  }
}
