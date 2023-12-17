export interface TokenPayload {
  id: string
}

export interface AccessToken extends TokenPayload {
  exp: number
}

export interface RefreshToken extends TokenPayload {
  exp: number
}
