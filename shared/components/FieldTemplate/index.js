import React from 'react'
import { FormattedMessage } from 'react-intl'
// import { Link } from 'react-router-dom';
import { FieldItem, FieldInput, FieldError } from 'components/Form'
import Spinner from 'resources/icons/Spinner'
import ShowPasswordIcon from 'resources/icons/ShowPasswordIcon'
import HidePasswordIcon from 'resources/icons/HidePasswordIcon'
// import withdraw_transfer from 'resources/images/withdraw_transfer.png'
import style from './style.css'

const validationCode = {
  zh: '发送验证码',
  en: 'Validation code',
  ja: '検証コード',
  ko: '인증번호',
  ru: 'Код проверки',
  vi: 'mã xác nhận',
  'zh-Hant': '驗證碼'
}


export const NormalField = ({ name, input, label, type, placeholder, meta: { touched, error }, custom, center }) => (
  <FieldItem hasError={touched && error} center={center || false}>
    <label htmlFor={name}>{label}</label>
    <input className={custom ? style.custom : ''} autoComplete="off" {...input} type={type} placeholder={placeholder} />
    {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
  </FieldItem>
)
export const NormalField_style = ({ name, input, label, type, placeholder, meta: { touched, error }, custom, center }) => (
  <FieldItem hasError={touched && error} center={center || false}>
    <label htmlFor={name} className={style.left}>{label}</label>
    <input className={custom ? style.custom : ''} autoComplete="off" {...input} type={type} placeholder={placeholder} />
    {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
  </FieldItem>
)
export const NormalFields = ({ name, input, label, type, placeholder, currency, text, fee, FEES, meta: { touched, error }, custom, center, toFee }) => (
  <FieldItem hasError={touched && error} center={center || false}>
    <label htmlFor={name} className={style.left}>{label}</label>
    <input className={custom ? style.custom : ''} autoComplete="off" {...input} type={type} placeholder={placeholder} />
    {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
    <div className={style.net_service_charge}>
      <span>{text}<span className={style.service_charge}>{fee || FEES.withdraw[currency]}</span><span>{currency === 'XUC' ? 'ETH' : currency}</span></span><a className={style.postage_details} onClick={toFee}><FormattedMessage id="withdraw_form_fee_detail" /></a>
    </div>
  </FieldItem>
)
export const VcodeField = ({ name, input, label, type, status, meta: { touched, error }, disabled, countDownSeconds, loading, sendVcode, placeholder, custom, center, locale }) => (
  <FieldItem hasError={touched && error} center={center}>
    <label htmlFor={name}>{label}</label>
    <div className={custom ? style.customVcode : style.widthAuto}>
      <FieldInput status={status} >
        <input autoComplete="off" {...input} type={type} placeholder={placeholder} />
        <button disabled={disabled} onClick={sendVcode} type="button" className={style.sendBtn}>
          {
            loading ? <Spinner color="#005eda" /> : countDownSeconds ? <span>{countDownSeconds}{locale === 'zh' ? '秒后再试' : 's'}</span> : <span>{validationCode[locale]}</span>
          }
        </button>
      </FieldInput>
    </div>
    {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
  </FieldItem>
)
export const NormalField_withdraw = ({ name, input, label, type, placeholder, meta: { touched, error }, custom, center, exchange_verify, verification, trade_google, trade_short_message, isVerifition }) => (
  <FieldItem hasError={touched && error} center={center || false}>
    <label htmlFor={name} className={style.left}>{label}</label>
    <input className={custom ? style.custom : ''} autoComplete="off" {...input} type={type} placeholder={placeholder} />
    {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
    {isVerifition ? <a onClick={exchange_verify} className={style.exchange_verify}>{verification ? <FormattedMessage id={trade_google} /> : <FormattedMessage id={trade_short_message} />}</a> : null}
  </FieldItem>
)
export const VcodeField_withdraw = ({ name, input, label, type, status, meta: { touched, error }, disabled, countDownSeconds, loading, sendVcode, placeholder, custom, center, locale, exchange_verify, verification, trade_google, trade_short_message, isVerifition }) => (
  <FieldItem hasError={touched && error} center={center}>
    <label htmlFor={name} className={style.left}>{label}</label>
    <div className={custom ? style.customVcode : style.widthAuto}>
      <FieldInput status={status} >
        <input autoComplete="off" {...input} type={type} placeholder={placeholder} />
        <button disabled={disabled} onClick={sendVcode} type="button" className={style.sendBtn}>
          {
            loading ? <Spinner color="#005eda" /> : countDownSeconds ? <span>{countDownSeconds}{locale === 'zh' ? '秒后再试' : 's'}</span> : <span>{validationCode[locale]}</span>
          }
        </button>
      </FieldInput>
      {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
      {isVerifition ? <a onClick={exchange_verify} className={style.exchange_verify}>{verification ? <FormattedMessage id={trade_google} /> : <FormattedMessage id={trade_short_message} />}</a> : null}
    </div>
  </FieldItem>
)

export class PasswordField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type
    }
    this.onShowPassword = this.onShowPassword.bind(this)
  }

  onShowPassword() {
    const type = this.state.type
    this.setState({
      type: type === 'text' ? 'password' : 'text'
    })
  }

  render () {
    const { name, input, label, placeholder, meta: { touched, error }, custom, center } = this.props
    const { type } = this.state
    return (
      <FieldItem hasError={touched && error} center={center || false}>
        <label htmlFor={name}>{label}</label>
        <span className="custom-password">
          <input className={custom ? style.custom : ''} autoComplete="off" {...input} type={type} placeholder={placeholder} />
          <span onClick={this.onShowPassword}>
            {
              type === 'text' ?
                <ShowPasswordIcon />
                : <HidePasswordIcon />
            }
          </span>
        </span>
        {touched && error && <FieldError><FormattedMessage id={error} /></FieldError>}
      </FieldItem>
    )
  }
}
