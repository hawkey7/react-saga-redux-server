/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, reduxForm, formValueSelector } from 'redux-form/es/immutable'
import { FieldItem, ServerError } from 'components/Form'
import { BaseInputItem, RightBtnInputItem, PasswordField } from 'components/Form/frontBaseForm'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
import Spinner from 'resources/icons/Spinner'
import * as forgotPasswordActions from 'actions/password'
import * as vcodeActions from 'actions/vcode'
import * as flowIdActions from 'actions/flowId'
import PasswordStrength from 'components/PasswordStrength'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import EmailIcon from 'resources/icons/FormEmail'
import LockIcon from 'resources/icons/FormLock'
import LockAIcon from 'resources/icons/FormLockA'
import SuccessGreen from 'resources/icons/SuccessGreen'
import CheckCodeIcon from 'resources/icons/CheckCode'
import ArrowGrayIcon from 'resources/icons/ArrowGrayIcon'
import ArrowGreenIcon from 'resources/icons/ArrowGreenIcon'
import { normalizeVcode, normalizeText, normalizePasswordText } from 'utils/normalize'
import validateMessages from 'utils/validateMessages.json'
// import Sub from 'utils/sub'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const checkValidReceiver = receiver => (/^\w+(\.\w+)*@\w+(\.\w+)+$/.test(receiver))

const validate = (values) => {
  const errors = {}

  if (!values.get('username')) {
    errors.username = 'input_validation_empty_email'
  } else if (!checkValidReceiver(values.get('username'))) {
    errors.username = 'input_validation_error_email'
  }

  if (!values.get('vcode')) {
    errors.vcode = 'input_validation_empty_validation_code'
  }

  if (!values.get('newPassword')) {
    errors.newPassword = 'input_validation_empty_password'
  } else if (values.get('newPassword').length > 32 || values.get('newPassword').length < 8) {
    errors.newPassword = 'input_validation_error_password'
  }

  if (values.get('newPassword') !== values.get('confirm_new_password')) {
    errors.confirm_new_password = 'input_validation_mismatch'
  }

  if (!values.get('confirm_new_password')) {
    errors.confirm_new_password = 'input_validation_empty_new_password'
  }

  return errors
}

@reduxForm({ form: 'forgotPasswordForm', validate })

@connect(
  state => ({
    forgotPassword: state.password,
    vcode: state.vcode,
    captcha: state.captcha,
    flowId: state.flowId,
    username: formValueSelector('forgotPasswordForm')(state, 'username'),
    locale: state.intl.get('locale')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...forgotPasswordActions,
      ...vcodeActions,
      ...flowIdActions
    }, dispatch)
  })
)

export default class ForgotPasswordForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
    this.getFlowId = this.getFlowId.bind(this)
  }

  componentDidMount() {
    this.getFlowId()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.getFlowId()
    }
  }

  getFlowId() {
    this.props.actions.getFlowIdRequested({ usage: 'forgot-password' })
  }

  componentWillUnmount() {
    this.props.actions.forgotPasswordReset()
  }

  sendVcode() {
    const { locale } = this.props
    const FlowId = this.props.flowId.get('data').get('flowId')
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading') && checkValidReceiver(this.props.username)) {
      this.props.actions.sendVCodeRequested({ receiver: this.props.username, flowId: FlowId, usage: 'forgot-password', language: locale })
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
    const submitData = {
      formData: data.delete('confirm_new_password').toJS(),
      step: this.props.forgotPassword.get('step'),
      flowId: this.props.flowId.get('data').get('flowId')
    }
    this.props.actions.forgotPasswordRequested(submitData)
  }

  render() {
    const { forgotPassword, username, vcode, invalid, pristine, handleSubmit, locale } = this.props
    const step = forgotPassword.get('step')
    const error = forgotPassword.get('error')
    const loading = forgotPassword.get('loading')
    const disabled = invalid || loading || pristine
    const validReceiver = checkValidReceiver(username)
    const passwordStrength = forgotPassword.get('passwordStrength')
    const vcodeRequesting = vcode.get('forgotPassword').get('loading')
    const vcodeStatus = this.getVcodeStatus(vcode.get('forgotPassword'))
    const countDownSeconds = vcode.get('forgotPassword').get('countDownSeconds')
    const toLoginCountDownSeconds = forgotPassword.get('toLoginCountDownSeconds')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={style.forgotPasswordForm}>
          <div className={style.guide}>
            <div className={style.green}>
              <div />
              <FormattedMessage id="find_passpord_step_one_get_email" />
            </div>
            <div className={style.svg}>
              <ArrowGreenIcon />
            </div>
            <div>
              <div className={step >= 2 ? style.green : style.gray}>
                <div />
                <FormattedMessage id="find_passpord_step_two_reset_password" />
              </div>
            </div>
            <div>{step > 2 ? <div className={style.svg}><ArrowGreenIcon /></div> : <div className={style.svg}><ArrowGrayIcon /></div>}</div>
            <div>
              <div className={step === 3 ? style.green : style.gray}>
                <div />
                <FormattedMessage id="find_passpord_step_two_reset_success" />
              </div>
            </div>
          </div>
          {step === 1 && <div className={style.title}><FormattedMessage id="find_passpord_step_one_title" /></div>}
          {step === 2 && <div className={style.title}><FormattedMessage id="find_passpord_step_two_title" /></div>}
          <form className={style.form} onSubmit={handleSubmit(this.submit)}>
            {step === 1 && <div>
              <Field
                name="username"
                type="text"
                component={BaseInputItem}
                placeholder={messages[locale].input_validation_empty_email}
                normalize={normalizeText}
                leftSymbol={<EmailIcon />}
              />
              <Field
                name="vcode"
                type="text"
                locale={locale}
                component={RightBtnInputItem}
                normalize={normalizeVcode}
                placeholder={messages[locale].input_validation_empty_validation_code}
                disabled={vcodeRequesting || !validReceiver || !!countDownSeconds}
                countDownSeconds={countDownSeconds}
                loading={vcodeRequesting}
                sendVcode={this.sendVcode}
                status={vcodeStatus}
                leftSymbol={<CheckCodeIcon />}
              />
            </div>}
            {step === 2 && <Field
              name="newPassword"
              type="password"
              component={PasswordField}
              placeholder={messages[locale].input_forgot_new_password}
              normalize={normalizePasswordText}
              leftSymbol={<LockAIcon />}
              rightSymbol={true}
              noBlank={!!passwordStrength}
            />}
            {(step === 2 && !!passwordStrength) && <FieldItem withoutLabel center><PasswordStrength strength={passwordStrength} /></FieldItem>}
            {step === 2 && <Field
              name="confirm_new_password"
              type="password"
              component={PasswordField}
              placeholder={messages[locale].input_forgot_confirm_password}
              normalize={normalizePasswordText}
              leftSymbol={<LockIcon />}
              rightSymbol={true}
            />}
            {step < 3 && <div className={style.submitBtn}>
              <button type="submit" disabled={disabled}>
                {loading ? <Spinner /> : (step === 2 ? <FormattedMessage id="input_button_reset" /> : <FormattedMessage id="input_button_next" />)}
              </button>
              {step === 1 && <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>}
            </div>}
            {error && typeof error === 'object' && <FieldItem withoutLabel center><ServerError><FormattedMessage id={errorMessages(error.message)} /></ServerError></FieldItem>}
            {step === 3 &&
            <div className={style.successWrap}>
              <SuccessGreen />
              <div>
                <FormattedMessage id="input_sign_up_success" />
                <span className={style.time}>{toLoginCountDownSeconds}S</span>
                <FormattedMessage id="input_sign_up_notice" />
              </div>
              <Link to="/login"><FormattedMessage id="input_to_sign_in" /></Link>
            </div>
            }
          </form>
        </div>
      </IntlProvider>
    )
  }
}
