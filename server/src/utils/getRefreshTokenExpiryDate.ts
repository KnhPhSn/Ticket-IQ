import { REFRESH_TOKEN_EXPIRY_MS } from "../config/constants";

export const getRefreshTokenExpiryDate = (): Date => {
    return new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
}
