import type { AxiosError } from "axios";

export type BackendError = AxiosError<{ message: string }>;