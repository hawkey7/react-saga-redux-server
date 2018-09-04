import { DECIMALPLACES, MARKETS_DECIMALPLACES } from 'constants/currency'

export const normalizeVcode = (value: any, previousValue: any) => (value && ((/^\d+$/.test(value) && value.length <= 6) ? value.trim() : previousValue))

export const normalizeCaptch = (value: any, previousValue: any) => (value && ((/^\w+$/.test(value) && value.length <= 4) ? value.trim() : previousValue))

export const normalizeText = (value: any, previousValue: any) => (value && (value.length <= 50 ? value.trim() : previousValue))

export const normalizePasswordText = (value: any, previousValue: any) => (value && ((value.trim().length <= 32 && !/[^\x00-\xff]/.test(value.trim())) ? value.trim() : previousValue))

export const normalizeNickNameText = (value: any, previousValue: string) => (value.split('').reduce((s: any, x: any) => (/[\u4e00-\u9fa5]/.test(x) ? s += 2 : s += 1), 0) > 20 ? previousValue : value.trim())

export const normalizeTradePassword = (value: any, previousValue: any) => (value && ((/^\d+$/.test(value) && value.length <= 6) ? value.trim() : previousValue))

export const normalizeIdCard = (value: any, previousValue: any) => (value && (/^\d+(x?|X?)$/.test(value) ? value.trim() : previousValue))

export const normalizePhone = (value: any, previousValue: any) => (value && (/^\d+$/.test(value) ? value.trim() : previousValue))

export const normalizeBankAccount = (value: any, previousValue: any) => (value && (/^\d+$/.test(value.replace(/\s/g, '')) ? value.replace(/\s/g, '').match(/.{1,4}/g).join(' ') : previousValue))

const numberRe = (decimalPlaces: number) => decimalPlaces ? new RegExp(`^\\s*(\\d+(\\.(\\d{1,${decimalPlaces}})?)?|(\\.\\d{1,${decimalPlaces}}))\\s*$`) : new RegExp(`^\\s*(\\d+)\\s*$`)

const normalizeUnit = (value: any, previousValue: any, decimalPlaces: number) => (value && (numberRe(decimalPlaces).test(value) ? value.trim() : previousValue))

export const normalizeUnitByCurrency = (currency: Currency) => (value: any, previousValue: any) => normalizeUnit(value, previousValue, DECIMALPLACES[currency])

export const normalizeUnitByMarket = (market: Market, type: string) => (value: any, previousValue: any) => normalizeUnit(value, previousValue, MARKETS_DECIMALPLACES[market][type])
// 可提币至小数点后4位，小数点4位以后无法输入
export const amountLength = (value: any, previousValue: any) => (value && ((/^\d+$/.test(value)) ? value.trim() : previousValue))

export const normalizeAddress = (value: any, previousValue: any) => (value && ((/^\w+$/.test(value) && value.length <= 42) ? value.trim() : previousValue))
