/* @jsx */

import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Spinner from 'resources/icons/Spinner'
import ShowPasswordIcon from 'resources/icons/ShowPasswordIcon'
import HidePasswordIcon from 'resources/icons/HidePasswordIcon'
import style from './frontBaseForm.css'

const validationCode = {
  zh: '发送验证码',
  en: 'Validation code',
  ja: '検証コード',
  ko: '인증번호',
  ru: 'Код проверки',
  vi: 'mã xác nhận',
  'zh-Hant': '驗證碼'
}

export const BaseInputItem = ({ input, type, placeholder, meta: { touched, error }, leftSymbol, rightSymbol }) => (
  <div className={style.item}>
    <div className={classNames({
      [style.input]: true,
      [style.hasLeftSymbol]: !!leftSymbol,
      [style.hasRightSymbol]: !!rightSymbol,
      [style.inputError]: touched && error,
    })}
    >
      <input type={type} {...input} autoComplete="off" placeholder={placeholder} />
      {leftSymbol && <div className={style.leftSymbol}>{leftSymbol}</div>}
    </div>
    {!(touched && error) ? <div className={style.blank} /> : <div className={style.errorTip}><FormattedMessage id={error} /></div>}
  </div>
)

export const BaseInputItems = ({ label, input, type, placeholder, meta: { touched, error }, fee, currency = 'ETC' }) => (
  <div className={style.item}>
    <div className={style.withdraw}>
      <label htmlFor={name} className={style.left}>{label}</label>
      <input type={type} {...input} autoComplete="off" placeholder={placeholder} />
      {fee && <div className={style.fee}><FormattedMessage id="withdraw_form_fee_title" /><span className={style.number}>{fee}</span></div>}
      {fee && <a className={style.detail}>
        <FormattedMessage id="withdraw_form_fee_detail" />
        <div className={style.detailContent}><FormattedMessage id="withdraw_form_fee_detail_content" values={{ currency }} /></div>
      </a>}
    </div>
    {!(touched && error) ? <div className={style.blank} /> : <div className={style.ErrorTip}><FormattedMessage id={error} /></div>}
  </div>
)

export const BaseInputVcode = ({ name, input, label, type, meta: { touched, error }, disabled, countDownSeconds, loading, sendVcode, placeholder, custom, locale, status }) => (
  <div className={style.item}>
    <div className={custom ? style.customVcode : style.widthAuto}>
      <div className={style.vcode}>
        <label htmlFor={name} className={style.left}>{label}</label>
        <input autoComplete="off" {...input} type={type} placeholder={placeholder} />
        <div className={style.vcodeButton}>
          {status && <div className={style.sendCodeTip}>{status}</div>}
          <button disabled={disabled} onClick={sendVcode} type="button" className={style.sendBtn}>
            {
              loading ? <Spinner color="#005eda" /> : countDownSeconds ? <span>{countDownSeconds}{locale === 'zh' ? '秒后再试' : 's'}</span> : <span>{validationCode[locale]}</span>
            }
          </button>
        </div>
      </div>
    </div>
    {!(touched && error) ? <div className={style.blank} /> : <div className={style.ErrorTip}><FormattedMessage id={error} /></div>}
  </div>
)

export const RightBtnInputItem = ({ input, type, placeholder, meta: { touched, error }, leftSymbol, locale, disabled, countDownSeconds, loading, sendVcode, status, color = '#f9f9f9' }) => (
  <div className={style.item}>
    <div className={classNames({
      [style.input]: true,
      [style.hasLeftSymbol]: true,
      [style.hasRightBtn]: true,
      [style.inputError]: touched && error,
    })}
    >
      <input type={type} {...input} autoComplete="off" placeholder={placeholder} />
      <div className={style.leftSymbol}>{leftSymbol}</div>
      <div className={style.rightBtn}>
        {status && <div className={style.sendCodeTip}>{status}</div>}
        <button disabled={disabled} onClick={sendVcode} type="button">
          {
            loading ? <Spinner color={color} /> : countDownSeconds ? <span>{countDownSeconds}{locale === 'zh' ? '秒后再试' : 's'}</span> : <span>{validationCode[locale]}</span>
          }
        </button>
      </div>
    </div>
    {!(touched && error) ? <div className={style.blank} /> : <div className={style.errorTip}><FormattedMessage id={error} /></div>}
  </div>
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
    const { type } = this.state
    this.setState({
      type: type === 'text' ? 'password' : 'text'
    })
  }

  render () {
    const { input, placeholder, meta: { touched, error }, leftSymbol, rightSymbol, noBlank } = this.props
    const { type } = this.state
    return (
      <div className={style.item}>
        <div className={classNames({
          [style.input]: true,
          [style.hasLeftSymbol]: !!leftSymbol,
          [style.hasRightSymbol]: !!rightSymbol,
          [style.inputError]: touched && error,
        })}
        >
          <input type={type} {...input} autoComplete="off" placeholder={placeholder} />
          {leftSymbol && <div className={style.leftSymbol}>{leftSymbol}</div>}
          {rightSymbol && <div className={style.rightSymbol} onClick={this.onShowPassword}>{type === 'text' ? <ShowPasswordIcon /> : <HidePasswordIcon />}</div>}
        </div>
        {!(touched && error) ? (!noBlank && <div className={style.blank} />) : <div className={style.errorTip}><FormattedMessage id={error} /></div>}
      </div>
    )
  }
}
