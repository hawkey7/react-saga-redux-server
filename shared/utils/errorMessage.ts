
export const errorMessages = (error: { message: string }) => {
  if (!error) {
    return 'unkown_error'
  }
  const message = typeof error === 'object' ? error.message : error
  switch (String(message)) {
    case 'NO_SUCH_USER':
      return 'error_messages_no_user'
    case 'PHONE_EXISTED':
      return 'error_messages_existed_phone'
    case 'EMAIL_EXISTED':
    case 'EMAIL_REGISTERED':
      return 'error_messages_existed_email'
    case 'EXISTED_NICKNAME':
      return 'error_messages_existed_nickname'
    case 'INVALID_TRADE_PASSWORD':
      return 'error_messages_invalid_trade_password'
    case 'PASSWORD_ERROR':
      return 'error_messages_invalid_trade_password'
    case 'TRADE_PASSWORD_EXISTED':
      return 'error_messages_existed_trade_password'
    case 'INVALID_OLD_TRADE_PASSWORD':
      return 'error_messages_invalid_old_trade_password'
    case 'INVALID_OLD_PASSWORD':
      return 'error_messages_invalid_old_password'
    case 'INVALID_VCODE':
      return 'error_messages_invalid_code'
    case 'VCODE_TRY_TIMES_EXCEED_LIMIT':
    case 'VCODE_NOT_FOUND':
      return 'error_messages_too_much_times'
    case 'INVALID_CAPTCHA':
      return 'error_messages_invalid_captcha'
    case 'INVALID_GOOGLE_CODE':
      return 'error_messages_invalid_google_code'
    case 'WRONG_PASSWORD':
    case 'invalid_grant':
      return 'error_messages_wrong_password'
    case 'INVALID_FLOW':
      return 'error_messages_invalid_flow'
    case 'FREEZE_FAIL_USERID_NOT_EXIST':
      return 'freeze_fail_userid_not_exist'
    case 'FREEZE_FAIL_NSF':
      return 'withdraw_form_withdrawal_error_concurrent'
    case 'WITHDRAW_ACCOUNT_NOT_EXIST':
      return 'withdraw_form_withdrawal_error_concurrent'
    case 'FREQUENCY_NOT_ALLOWED':
      return 'withdraw_form_withdrawal_error_concurrent'
    case 'XUC_FREEZE_FAIL_ETH_UNFREEZE':
      return 'withdraw_form_withdrawal_error_concurrent'
    case 'INVALID_ARGUMENTS':
      return 'error_messages_invalid_arguments'
    case 'WITHDRWAW_ACCOUNT_INVALID_TRADE_PASSWORD_TRY_TIMES_LEFT':
      return 'withdraw_last_time'
    case 'RATE_LIMIT_EXCEEDED':
      return 'withdraw_rate_limit_exceeded'
    case 'UNKOWN_ERROR':
      return 'unkown_error'
    case 'FORTUNE_FAILED_TO_FREEZE':
      return 'fortune_failed_to_freeze'
    case 'FORTUNE_FAILED_TO_UNFREEZE':
      return 'forture_failed_to_unfreeze'
    case 'FORTUNE_FAILED_TO_BETTING':
      return 'forture_failed_to_betting'
    case 'WITHDRAW_INSUFFICIENT_BALANCE':
      return 'withdraw_insufficient_balance'
    case 'WITHDRAW_FREEZE_FAILS':
      return 'withdraw_freeze_fails'
    case 'WITHDRAW_UNFREEZE_FAILS':
      return 'withdraw_unfreeze_fails'
    case 'WITHDRAW_INVALID_VCODE':
      return 'withdraw_invaild_vcode'
    case 'WITHDRAW_LESS_THAN_WITHDRAW_MINIMUM_AMOUNT':
      return 'withdraw_less_than_withdraw_minimum_amount'
    case 'WITHDRAW_PARAM_NULL':
      return 'withdraw_param_null'
    case 'WITHDRAW_ORDER_APPROVE_ERROR':
      return 'withdraw_order_approve_error'
    case 'WITHDRAW_ORDER_RENEW_ERROR':
      return 'withdraw_order_renew_error'
    case 'WITHDRAW_INVALID_TRADE_PASSWORD_TRY_TIMES_EXCEED_LIMIT':
      return 'withdraw_inbaild_trade_password_try_times_exceed_limit'
    case 'WITHDRAW_INVALID_TRADE_PASSWORD_TRY_TIMES_LEFT':
      return 'withdraw_invalid_trade_password_try_times_left'
    case 'WITHDRAW_WALLET_ADDRESS_EMPTY':
      return 'withdraw_wallet_address_empty'
    case 'WITHDRAW_OUT_ERROR':
      return 'withdraw_out_error'
    case 'WITHDRAW_ADDRESS_REPEATE_WITH_RECHARGE':
      return 'withdraw_address_repeate_with_recharge'
    case 'WITHDRAW_ORDER_STATUS_INVALID':
      return 'withdraw_order_status_invaild'
    case 'WITHDRAW_EXCEED_LIMIT':
      return 'withdraw_exceed_limit'
    case 'PER_DAY_AMOUNT_EXCEED':
      return 'per_day_ammount_exceed'
    case 'PER_DAY_FREQUENCY_EXCEED':
      return 'per_day_frequency_exceed'
    case 'PER_DAY_FREQUENCY_AND_AMOUNT_EXCEED':
      return 'per_day_frequency_and_amount_exceed'
    case 'ACCT_CONCURRENT_LOCKED':
      return 'acct_concurrent_locked'
    case 'ACCOUNT_NOT_EXIST':
      return 'account_not_exist'
    case 'INSUFFICIENT_ACCOUNT':
      return 'insufficient_account'
    case 'USER_NOT_EXIST':
      return 'user_not_exist'
    case 'AMOUNT_IS_TOO_SMALL':
      return 'amount_is_too_small'
    case 'AMOUNT_SCALE_IS_TOO_BIG':
      return 'amount_scale_is_too_big'
    case 'OPTION_NOT_EXIST':
      return 'option_not_exist'
    case 'GAME_NOT_EXIST':
      return 'game_not_exist'
    case 'account_blocked':
      return 'account_blocked'
    case 'GAME_NOT_OPENING':
      return 'game_not_opening'
    case 'OPTION_SUM_AMOUNT_IS_BEYOND':
      return 'option_sum_amount_is_beyond'
    case 'GAME_SUM_AMOUNT_IS_BEYOND':
      return 'game_sum_amount_is_beyond'
    case 'ACCOUNT_LOCKED':
      return 'account_locked_two_hours'
    case 'WITHDRAW_ADDRESS_IS_CONTRACT_ADDRESS':
      return 'withdraw_address_invalid'
    default:
      return 'error_messages_networks'
  }
}

export const vcodeErrorMessages = (error: { message: string }) => {
  const message = typeof error === 'object' ? error.message : error
  switch (String(message)) {
    case 'INVALID_PHONE':
      return 'error_messages_invalid_phone'
    case 'INVALID_EMAIL':
    case 'EMAIL_REGISTERED':
      return 'error_messages_existed_email'
    case 'VCODE_NOT_FOUND':
    case 'VCODE_TRY_TIMES_EXCEED_LIMIT':
      return 'error_messages_too_much_times'
    case 'INVALID_FLOW':
      return 'error_messages_invalid_flow'
    case 'INVALID_GOOGLE_CODE':
      return 'error_messages_invalid_google_code'
    case 'INVALID_ARGUMENTS':
      return 'error_messages_invalid_arguments'
    default:
      return 'error_messages_networks'
  }
}

export const mergeMessages = (messages: any = []) => {
  let zh = {}
  let en = {}
  let ko = {}
  let ja = {}
  let ru = {}
  let vi = {}
  let zh_Hant = {}
  messages.map((item: any) => {
    zh = { ...zh, ...item.zh }
    en = { ...en, ...item.en }
    ko = { ...ko, ...item.ko }
    ja = { ...ja, ...item.ja }
    ru = { ...ru, ...item.ru }
    vi = { ...vi, ...item.vi }
    zh_Hant = { ...zh_Hant, ...item['zh-Hant'] }
  })
  return {
    zh,
    en,
    ko,
    ja,
    ru,
    vi,
    'zh-Hant': zh_Hant
  }
}
