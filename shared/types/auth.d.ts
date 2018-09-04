declare interface AuthParams {
  grant_type: GrandType
  username?: string
  password?: string
  scope?: string
  refresh_token?: string
}

declare interface AuthResult {
  access_token: string
  refresh_token: string
  expires_in: number
  source: string
  grant_type?: GrandType
}

declare interface ValidateTokenParams {
  token: string
}

declare interface ValidateTokenResult {
  exp: number
}
