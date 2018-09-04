declare interface BankAccount {
  bank_name: string
  bank_branch: string
  account: string
  verified: boolean
  from_kyc: boolean
}

declare interface Wallet {
  currency: Currency
  address: string
}

declare interface Balance {
  currency: Currency
  quantity: number
  fozen_quantity: number
}

declare interface Profile {
    user_id: string
    nickname: string
    email: string
    email_verified: boolean
    phone: string
    phone_verified: boolean
    avatar: string
    bank_accounts: BankAccount[]
    wallets: Wallet[]
    balances: Balance[]
    kyc_info: {
        level: number
        status: string
        name: string
        phone: string
        id_card: string
        bank_account: {
            bank_name: string
            bank_branch: string
            account: string
            verified: boolean
            from_kyc: boolean
        }
    }
    has_trade_password: boolean
}

declare interface GetWalletAddressParams {
  currency: string
}

declare interface GetWalletAddressResult {
  address: string
}
