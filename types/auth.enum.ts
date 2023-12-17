export enum TokenExpiration {
  AccessToken = 5 * 60 * 1000,
  RefreshToken = 7 * 24 * 60 * 60 * 1000
}

export enum Cookies {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}
