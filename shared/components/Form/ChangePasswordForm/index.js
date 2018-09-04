/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, formValueSelector, reduxForm } from 'redux-form/es/immutable'
import { FormContainer, FieldItem, ServerError, ServerResult } from 'components/Form'
import { BaseInputItems, BaseInputVcode } from 'components/Form/frontBaseForm'
import { NormalField, VcodeField } from 'components/FieldTemplate'
import PasswordStrength from 'components/PasswordStrength'
import { normalizeVcode, normalizePasswordText } from 'utils/normalize'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
import Spinner from 'resources/icons/Spinner'
import * as actions from 'actions/securitySetting'
import * as vcodeActions from 'actions/vcode'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const checkValidReceiver = receiver => (receiver ? receiver && receiver.trim().length >= 6 && receiver.trim().length <= 32 : false)

const validate = (values) => {
  const errors = {}

  if (!values.get('oldPassword')) {
    errors.oldPassword = 'change_password_validate_empty_old_password'
  }

  if (!values.get('confirm_password')) {
    errors.confirm_password = 'change_password_validate_empty_new_password'
  }

  if (!values.get('newPassword')) {
    errors.newPassword = 'change_password_validate_empty_new_password'
  } else if (values.get('newPassword').length > 32 || values.get('newPassword').length < 8) {
    errors.newPassword = 'change_password_validate_error_new_password'
  }

  if (!values.get('vcode')) {
    errors.vcode = 'change_password_validate_empty_validation_code'
  }

  if (values.get('newPassword') !== values.get('confirm_password')) {
    errors.confirm_password = 'change_password_validate_confirm_new_password'
  }

  return errors
}

@connect(
  state => ({
    securitySetting: state.securitySetting,
    vcode: state.vcode,
    email: state.me.get('data').get('email'),
    newPassword: formValueSelector('changePasswordForm')(state, 'newPassword'),
    locale: state.intl.get('locale')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...vcodeActions
    }, dispatch)
  })
)

@reduxForm({ form: 'changePasswordForm', validate })

export default class ChangePasswordForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.sendVcode = this.sendVcode.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentWillUnmount() {
    this.props.actions.hideChangePasswordError()
  }

  sendVcode() {
    const { locale } = this.props
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading') && checkValidReceiver(this.props.email)) {
      this.props.actions.sendVCodeRequested({ receiver: this.props.email, usage: 'modify-password', language: locale })
    }
  }

  getVcodeStatus(vcode) {
    const vcodeError = vcode.get('error')
    const showVcodeSuccess = vcode.get('showSuccess')

    let vcodeStatus = null
    if (showVcodeSuccess) {
      vcodeStatus = <div className={style.message}><CheckIcon /><FormattedMessage id="change_password_send_success" /></div>
    } else if (vcodeError) {
      vcodeStatus = <div className={style.message}><DeleteIcon /><FormattedMessage id={vcodeErrorMessages(vcodeError.message)} /></div>
    }
    return vcodeStatus
  }

  submit(data) {
    const { locale } = this.props
    this.props.actions.changePasswordRequest(data.delete('confirm_password').set('language', locale).toJS())
  }

  cancel() {
    this.props.actions.hideChangePasswordForm()
  }

  render() {
    const { securitySetting, vcode, newPassword, invalid, pristine, handleSubmit, locale } = this.props
    const error = securitySetting.get('changePassword').get('error')
    const loading = securitySetting.get('changePassword').get('loading')
    const success = securitySetting.get('changePassword').get('success')
    const validReceiver = checkValidReceiver(newPassword)
    const vcodeRequesting = vcode.get('changePassword').get('loading')
    const vcodeStatus = this.getVcodeStatus(vcode.get('changePassword'))
    const countDownSeconds = vcode.get('changePassword').get('countDownSeconds')
    const disabled = invalid || loading || pristine
    const passwordStrength = securitySetting.get('changePassword').get('passwordStrength')
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={`${locale === 'ru' ? style.ru : ''} ${style.changePassword}`}>
          <FormContainer>
            <form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="oldPassword"
                type="password"
                component={isMobile ? NormalField : BaseInputItems}
                label={<FormattedMessage id="change_password_label_old_password" />}
                placeholder={messages[locale].change_password_validate_empty_old_password}
                normalize={normalizePasswordText}
                custom={true}
              />
              <Field
                name="newPassword"
                type="password"
                component={isMobile ? NormalField : BaseInputItems}
                label={<FormattedMessage id="change_password_label_new_password" />}
                placeholder={messages[locale].change_password_validate_empty_new_password}
                normalize={normalizePasswordText}
                custom={true}
              />
              {!!passwordStrength &&
              <FieldItem withoutLabel>
                <PasswordStrength strength={passwordStrength} />
              </FieldItem>
              }
              {!!passwordStrength &&
              <FieldItem withoutLabel>
                <p style={{ fontSize: '.75rem', color: '#333' }}><FormattedMessage id="change_password_strength_notice" /></p>
              </FieldItem>
              }
              <Field
                name="confirm_password"
                type="password"
                component={isMobile ? NormalField : BaseInputItems}
                label={<FormattedMessage id="change_password_label_confirm_password" />}
                placeholder={messages[locale].change_password_validate_empty_comfirm_password}
                normalize={normalizePasswordText}
                custom={true}
              />
              <Field
                name="vcode"
                type="text"
                component={isMobile ? VcodeField : BaseInputVcode}
                locale={locale}
                label={<FormattedMessage id="change_password_label_validation_code" />}
                placeholder={messages[locale].change_password_validate_empty_validation_code}
                normalize={normalizeVcode}
                disabled={vcodeRequesting || !validReceiver || !!countDownSeconds}
                countDownSeconds={countDownSeconds}
                loading={vcodeRequesting}
                sendVcode={this.sendVcode}
                status={vcodeStatus}
                custom={true}
              />
              <FieldItem withoutLabel>
                <div className={style.buttonGroup}>
                  <button type="button" onClick={this.cancel} disabled={loading}><FormattedMessage id="change_password_cancel" /></button>
                  <button type="submit" disabled={disabled}>{loading ? <Spinner /> : <FormattedMessage id="change_password_confirm" />}</button>
                </div>
              </FieldItem>
              <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>
              {error && <FieldItem withoutLabel><ServerError><FormattedMessage id={errorMessages(error)} /></ServerError></FieldItem>}
              {success && <FieldItem withoutLabel><ServerResult><FormattedMessage id="change_password_success" /></ServerResult></FieldItem>}
            </form>
          </FormContainer>
        </div>
      </IntlProvider>
    )
  }
}
