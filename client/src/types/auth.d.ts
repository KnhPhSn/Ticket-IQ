import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
}

export type AuthResponsePayload = PayloadAction<AuthResponseData>;  
