
import { AppError } from "../errors/app-error";

export type SafeError = {
  name: string;
  message: string;
  code?: string;
  statusCode?: number;
};

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: SafeError };

export async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    // for debugging
    console.error("tryCatchAsync error", err);

    const error = AppError.from(err);

    return {
      data: null,
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      },
    };
  }
}