import { REFRESH_TOKEN_EXPIRY_MS, REFRESH_TOKEN_EXPIRY_MS_LONG } from "../config/constants";

export const getRefreshTokenExpiryDate = (rememberMe: boolean): Date => {
    return new Date(Date.now() + (rememberMe ? REFRESH_TOKEN_EXPIRY_MS_LONG : REFRESH_TOKEN_EXPIRY_MS));
}
