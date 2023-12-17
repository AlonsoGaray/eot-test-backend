/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!
export const isProduction = process.env.NODE_ENV! === 'production'
export const baseDomain = process.env.BASE_DOMAIN!
