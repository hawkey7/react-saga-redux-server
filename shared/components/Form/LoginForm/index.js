/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, formValueSelector, reduxForm } from 'redux-form/es/immutable'
import * as queryString from 'query-string'
import { FieldItem, ServerError, ServerResult } from 'components/Form'
import { BaseInputItem, PasswordField } from 'components/Form/frontBaseForm'
import { normalizeText, normalizePasswordText } from 'utils/normalize'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
import Spinner from 'resources/icons/Spinner'
import * as actions from 'actions/auth'
import * as vcodeActions from 'actions/vcode'
import UserIcon from 'resources/icons/FormUser'
import LockAIcon from 'resources/icons/FormLockA'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const loginLogo = require('resources/images/loginLogo.png')

const validate = (values) => {
  const errors = {}

  if (!values.get('username')) {
    errors.username = 'input_validate_empty_email'
  }

  if (!values.get('password')) {
    errors.password = 'input_validate_empty_login_password'
  }

  if (!values.get('emailCode')) {
    errors.emailCode = 'input_validate_empty_validation_code'
  }

  return errors
}

@reduxForm({ form: 'loginForm', validate })

@connect(
  state => ({
    auth: state.auth,
    vcode: state.vcode,
    email: formValueSelector('loginForm')(state, 'username'),
    locale: state.intl.get('locale'),
    register: state.register
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...vcodeActions
    }, dispatch)
  })
)

export default class LoginForm extends Component {
  constructor(props, context) {
    super(props, context)

    this.submit = this.submit.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
  }

  componentWillUnmount() {
    this.props.actions.hideError()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.getFlowId()
    }
  }

  getFlowId() {
    // window.addSpecialListenerregister = new Sub()
    // const self = this
    // window.addSpecialListenerregister.on('passRobot-register', function(value) {
    //   console.warn('in on value ---->', value);
    //   console.warn('this in  window.addSpecialListener ', this);
    //   console.warn('self====> ', self);
    //   self.props.actions.passRobot(true)
    // })
    this.props.actions.getFlowId({ usage: 'register', location: 'register' })
  }

  sendVcode() {
    const { locale } = this.props
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading')) {
      this.props.actions.sendVCodeRequested({ receiver: this.props.email, usage: 'login', language: locale })
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
    const source = queryString.parse(window.location.search).source
    this.props.actions.loginRequested(data.set('scope', 'ui').set('grant_type', 'password').set('source', source).toJS())
  }

  render() {
    const { auth, invalid, pristine, handleSubmit, locale } = this.props
    const error = auth.get('error')
    const loading = auth.get('loading')
    const showLoginStrategyTips = auth.get('showLoginStrategyTips')
    const disabled = invalid || loading || pristine

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={style.loginForm}>
          <div className={style.loginLogo}><img src={loginLogo} alt="loginLogo" /></div>
          <div className={style.title}><FormattedMessage id="login_title" /></div>
          <form className={style.form} onSubmit={handleSubmit(this.submit)}>
            <Field
              name="username"
              type="text"
              component={BaseInputItem}
              placeholder={messages[locale].input_validate_empty_email}
              normalize={normalizeText}
              leftSymbol={<UserIcon color="#ddd" />}
            />
            <Field
              name="password"
              type="password"
              component={PasswordField}
              placeholder={messages[locale].input_validate_empty_login_password}
              normalize={normalizePasswordText}
              leftSymbol={<LockAIcon />}
              rightSymbol={true}
            />
            <div className={style.submitBtn}>
              <button type="submit" disabled={disabled}>{loading ? <Spinner /> : <FormattedMessage id="input_button_sign_in" />}</button>
            </div>
            {!error ? showLoginStrategyTips && loading === false ? <FieldItem withoutLabel center><ServerResult><FormattedMessage id="input_button_security_notice" /></ServerResult></FieldItem> : null : null}
            {error && <FieldItem withoutLabel center><ServerError><FormattedMessage id={errorMessages(error)} /></ServerError></FieldItem>}
          </form>
        </div>
      </IntlProvider>
    )
  }
}
