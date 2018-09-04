/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Field, formValueSelector, reduxForm } from 'redux-form/es/immutable'
import { FormContainer, FieldItem, ServerError, ServerResult } from 'components/Form'
import { BaseInputItems, BaseInputVcode } from 'components/Form/frontBaseForm'
import { NormalField, VcodeField } from 'components/FieldTemplate'
import { normalizeText, normalizeVcode } from 'utils/normalize'
import { errorMessages, vcodeErrorMessages, mergeMessages } from 'utils/errorMessage'
// import { validateEmail } from 'utils/asyncValidate'
import Spinner from 'resources/icons/Spinner'
import * as actions from 'actions/securitySetting'
import * as vcodeActions from 'actions/vcode'
import CheckIcon from 'resources/icons/CheckIcon'
import DeleteIcon from 'resources/icons/DeleteIcon'
import validateMessages from 'utils/validateMessages.json'
import initMessages from './messages.json'
import style from './style.css'

const messages = mergeMessages([validateMessages, initMessages])

const checkValidReceiver = receiver => (/^\w+(\.\w+)*@\w+(\.\w+)+$/.test(receiver))

const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'change_email_form_validate_empty_email'
  } else if (!checkValidReceiver(values.get('email'))) {
    errors.email = 'change_email_form_validate_error_email'
  }

  if (!values.get('newEmailVcode')) {
    errors.newEmailVcode = 'change_email_form_validate_empty_vcode'
  } else if (values.get('newEmailVcode').length !== 6) {
    errors.newEmailVcode = 'change_email_form_validate_six_vcode'
  }

  if (!values.get('oldEmailVcode')) {
    errors.oldEmailVcode = 'change_email_form_validate_empty_vcode'
  } else if (values.get('oldEmailVcode').length !== 6) {
    errors.oldEmailVcode = 'change_email_form_validate_six_vcode'
  }

  return errors
}

@connect(
  state => ({
    securitySetting: state.securitySetting,
    vcode: state.vcode,
    email: formValueSelector('modifyEmailForm')(state, 'email'),
    locale: state.intl.get('locale'),
    me: state.me
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...vcodeActions
    }, dispatch)
  })
)

// @reduxForm({ form: 'modifyEmailForm', validate, asyncValidate: validateEmail, asyncBlurFields: ['email'] })
@reduxForm({ form: 'modifyEmailForm', validate })

export default class ChangeEmailForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentWillUnmount() {
    this.props.actions.hideChangeEmailError()
  }

  sendVcode(type) {
    const { me, locale } = this.props
    const Email = type === 'old' ? me.get('data').get('email') : this.props.email
    if (!this.props.countDownSeconds && !this.props.vcode.get('loading') && checkValidReceiver(Email)) {
      this.props.actions.sendVCodeRequested({ receiver: Email, usage: `modify-email/${type}`, language: locale })
    }
  }

  getVcodeStatus(vcode) {
    const vcodeError = vcode.get('error')
    const showVcodeSuccess = vcode.get('showSuccess')

    let vcodeStatus = null
    if (showVcodeSuccess) {
      vcodeStatus = <div><CheckIcon /><span className={style.statusTips}><FormattedMessage id="change_email_form_send_success" /></span></div>
    } else if (vcodeError) {
      vcodeStatus = <div><DeleteIcon /><span className={style.statusTips}><FormattedMessage id={vcodeErrorMessages(vcodeError.message)} /></span></div>
    }
    return vcodeStatus
  }

  submit(data) {
    console.warn(data)
    this.props.actions.changeEmailRequest(data.toJS())
  }

  cancel() {
    this.props.actions.hideChangeEmailForm()
  }

  render() {
    const { securitySetting, vcode, email, invalid, pristine, handleSubmit, locale } = this.props
    const error = securitySetting.get('changeEmail').get('error')
    const loading = securitySetting.get('changeEmail').get('loading')
    const success = securitySetting.get('changeEmail').get('success')
    const validReceiver = checkValidReceiver(email)
    const vcodeRequestingOne = vcode.get('changeEmailOld').get('loading')
    const vcodeRequestingTwo = vcode.get('changeEmailNew').get('loading')
    const vcodeStatusOne = this.getVcodeStatus(vcode.get('changeEmailOld'))
    const vcodeStatusTwo = this.getVcodeStatus(vcode.get('changeEmailNew'))
    const countDownSecondsOne = vcode.get('changeEmailOld').get('countDownSeconds')
    const countDownSecondsTwo = vcode.get('changeEmailNew').get('countDownSeconds')
    const disabled = invalid || loading || pristine
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '')

    return (
      <IntlProvider messages={messages[locale]}>
        <div className={`${locale === 'ru' ? style.ru : ''} ${style.changeEmailForm}`}>
          <FormContainer>
            <form className={style.form} onSubmit={handleSubmit(this.submit)}>
              <Field
                name="oldEmailVcode"
                type="text"
                locale={locale}
                component={isMobile ? VcodeField : BaseInputVcode}
                label={<FormattedMessage id="change_email_form_label_formal_vcode" />}
                normalize={normalizeVcode}
                placeholder={messages[locale].input_old_vcode}
                disabled={!!countDownSecondsOne}
                loading={vcodeRequestingOne}
                countDownSeconds={countDownSecondsOne}
                sendVcode={this.sendVcode.bind(this, 'old')}
                custom={true}
                status={vcodeStatusOne}
              />
              <Field
                name="email"
                type="text"
                component={isMobile ? NormalField : BaseInputItems}
                label={<FormattedMessage id="change_email_form_label_email" />}
                placeholder={messages[locale].input_new_email}
                custom={true}
                normalize={normalizeText}
              />
              <Field
                name="newEmailVcode"
                type="text"
                locale={locale}
                component={isMobile ? VcodeField : BaseInputVcode}
                label={<FormattedMessage id="change_email_form_label_vcode" />}
                placeholder={messages[locale].input_new_vcode}
                normalize={normalizeVcode}
                disabled={vcodeRequestingTwo || !validReceiver || !!countDownSecondsTwo}
                loading={vcodeRequestingTwo}
                countDownSeconds={countDownSecondsTwo}
                sendVcode={this.sendVcode.bind(this, 'new')}
                custom={true}
                status={vcodeStatusTwo}
              />
              <FieldItem withoutLabel>
                <div className={style.buttonGroup}>
                  <button type="button" onClick={this.cancel} disabled={loading}><FormattedMessage id="change_email_form_cancel" /></button>
                  <button type="submit" disabled={disabled}>{loading ? <Spinner /> : <FormattedMessage id="change_email_form_confirm" />}</button>
                </div>
              </FieldItem>
              <div className={style.focus}><FormattedMessage id="input_button_focus" /></div>
              {error && <FieldItem withoutLabel><ServerError><FormattedMessage id={errorMessages(error)} /></ServerError></FieldItem>}
              {success && <FieldItem withoutLabel><ServerResult><FormattedMessage id="change_email_form_success" /></ServerResult></FieldItem>}
            </form>
          </FormContainer>
        </div>
      </IntlProvider>
    )
  }
}
