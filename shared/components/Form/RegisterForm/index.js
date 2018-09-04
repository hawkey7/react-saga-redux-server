/* @jsx */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, reduxForm, formValueSelector } from 'redux-form/es/immutable'
import { FieldItem, ServerError } from 'components/Form'
import { BaseInputItem, RightBtnInputItem, PasswordField } from 'components/Form/frontBaseForm'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
import { normalizeVcode, normalizeText, normalizePasswordText } from 'utils/normalize'
import * as flowIdActions from 'actions/flowId'
import * as vcodeActions from 'actions/vcode'
import * as registerActions from 'actions/register'
import Spinner from 'resources/icons/Spinner'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import LockAIcon from 'resources/icons/FormLockA'
import EmailIcon from 'resources/icons/FormEmail'
import SuccessGreen from 'resources/icons/SuccessGreen'
import CheckCodeIcon from 'resources/icons/CheckCode'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const checkValidReceiver = receiver => (/^\w+(\.\w+)*@\w+(\.\w+)+$/.test(receiver))

const getStringLength = (str) => {
  if (str) {
    const len = str.split('').reduce((s, x) => {
      if (/[\u4e00-\u9fa5]/.test(x)) {
        s += 2
      } else {
        s += 1
      }
      return s
    }, 0)
    return len
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.get('nickname')) {
    errors.nickname = 'input_validate_empty_nickname'
  } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(values.get('nickname'))) {
    errors.nickname = 'input_validate_error_nickname'
  } else if (getStringLength(values.get('nickname')) < 4) {
    errors.nickname = 'input_validate_notice_nickname'
  }

  if (!values.get('email')) {
    errors.email = 'input_validate_empty_email'
  } else if (!checkValidReceiver(values.get('email'))) {
    errors.email = 'input_validate_error_email'
  } else if (values.get('email').length > 50) {
    errors.email = 'input_validate_email_too_long'
  }

  if (!values.get('vcode')) {
    errors.vcode = 'input_validate_empty_validation_code'
  }

  if (!values.get('password')) {
    errors.password = 'input_validate_empty_login_password'
  } else if (values.get('password').length > 32 || values.get('password').length < 8) {
    errors.password = 'input_validate_error_login_password'
  }

  if (values.get('password') !== values.get('confirmPassword')) {
    errors.confirmPassword = 'input_validate_mismatch'
  }

  return errors
}

@connect(
  state => ({
    flowId: state.flowId,
    register: state.register,
    vcode: state.vcode,
    email: formValueSelector('registerForm')(state, 'email'),
    locale: state.intl.get('locale'),
    countDownSeconds: state.vcode.get('register').get('countDownSeconds')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...flowIdActions,
      ...vcodeActions,
      ...registerActions
    }, dispatch)
  })
)
@reduxForm({ form: 'registerForm', validate })

export default class RegisterForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      choose: true
    }
    this.submit = this.submit.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
    this.changeChecked = this.changeChecked.bind(this)
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
    this.props.actions.getFlowIdRequested({ usage: 'register' })
  }

  componentWillUnmount() {
    this.props.actions.reset()
  }

  sendVcode() {
    const { locale } = this.props
    const FlowId = this.props.flowId.get('data').get('flowId')
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading') && checkValidReceiver(this.props.email)) {
      this.props.actions.sendVCodeRequested({ receiver: this.props.email, usage: 'register', flowId: FlowId, language: locale })
    }
  }

  getVcodeStatus(vcode) {
    const vcodeError = vcode.get('error')
    const showVcodeSuccess = vcode.get('showSuccess')

    let vcodeStatus = null
    if (showVcodeSuccess) {
      vcodeStatus = <div><CheckIcon /><FormattedMessage id="input_send_code" /></div>
    } else if (vcodeError) {
      vcodeStatus = <div><DeleteIcon /><FormattedMessage id={vcodeErrorMessages(vcodeError.message)} /></div>
    }
    return vcodeStatus
  }

  changeChecked() {
    this.setState({
      choose: !this.state.choose
    })
  }

  submit(data) {
    const flowId = this.props.flowId.get('data').get('flowId')
    const actions = this.props.actions
    const Data = data.toJS()
    const marketingChannel = (localStorage.getItem('ETCGAME_UTMSOURCE') || '').replace('?', '')
    if (flowId) {
      actions.postRegisterRequested({ marketingChannel, vcode: Data.vcode, email: Data.email, password: Data.password })
    } else {
      actions.registerFailed()
    }
  }

  render() {
    const { register, email, vcode, invalid, pristine, handleSubmit, locale } = this.props
    const showSuccess = register.get('showSuccess')
    const error = register.get('error')
    const loading = register.get('loading')
    const disabled = invalid || loading || pristine || !this.state.choose
    const validReceiver = checkValidReceiver(email)
    // const passwordStrength = register.get('passwordStrength')
    const vcodeRequesting = vcode.get('register').get('loading')
    const vcodeStatus = this.getVcodeStatus(vcode.get('register'))
    const countDownSeconds = vcode.get('register').get('countDownSeconds')
    const toLoginCountDownSeconds = register.get('toLoginCountDownSeconds')
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={style.registerForm}>
          {!showSuccess && <div className={style.title}><FormattedMessage id="register_step_one_title" /></div>}
          <form className={style.form} onSubmit={handleSubmit(this.submit)}>
            {!showSuccess ?
              <div>
                <div>
                  <Field
                    name="email"
                    type="text"
                    component={BaseInputItem}
                    normalize={normalizeText}
                    placeholder={messages[locale].input_validate_empty_email}
                    leftSymbol={<EmailIcon />}
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
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder={messages[locale].input_validate_empty_login_password_repeat}
                    component={PasswordField}
                    normalize={normalizePasswordText}
                    leftSymbol={<LockAIcon />}
                    rightSymbol={true}
                  />
                  <Field
                    name="vcode"
                    type="text"
                    component={RightBtnInputItem}
                    locale={locale}
                    placeholder={messages[locale].input_validate_empty_validation_code}
                    normalize={normalizeVcode}
                    disabled={vcodeRequesting || !validReceiver || !!countDownSeconds}
                    countDownSeconds={countDownSeconds}
                    sendVcode={this.sendVcode}
                    loading={vcodeRequesting}
                    status={vcodeStatus}
                    leftSymbol={<CheckCodeIcon />}
                  />
                  <div className={style.tos}>
                    <div className={this.state.choose ? style.checked : ''} onClick={this.changeChecked} /><FormattedMessage id="input_agreement" /><Link to={isMobile ? '/service-center' : '/service-center?withoutHeader=true'} target={isMobile ? '' : '_blank'}><FormattedMessage id="input_to_agreement" /></Link>
                  </div>
                </div>
                <div className={classNames({
                  [style.submitBtn]: true,
                  [style.noPadding]: false
                })}
                >
                  <button type="submit" disabled={disabled}>{showSuccess ? <Spinner /> : <FormattedMessage id="input_button_sign_up" />}</button>
                </div>
                <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>
                {error &&
                <FieldItem withoutLabel center>
                  <ServerError>
                    <FormattedMessage id={errorMessages(error.message)} />
                  </ServerError>
                </FieldItem>
                }
              </div> : null
            }
            {
              showSuccess &&
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
