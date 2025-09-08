/**
 * Retry logic with exponential backoff
 *
 * @param operation - the async operation to retry
 * @param maxRetries - maximum number of retry attempts (default: 3)
 * @param baseDelayMs - base delay in milliseconds for exponential backoff (default: 1000)
 * @param operationName - name of the operation for logging purposes (default: "operation")
 * @returns promise that resolves with the operation result or rejects after max retries
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000,
  operationName: string = "operation",
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          `${operationName} failed after ${maxRetries} attempts:`,
          error,
        );
        throw error;
      }

      const delayMs = baseDelayMs * Math.pow(2, attempt - 1);
      console.warn(
        `${operationName} attempt ${attempt} failed, retrying in ${delayMs}ms...`,
        error instanceof Error ? error.message : error,
      );

      await new Promise((resolve) => global.setTimeout(resolve, delayMs));
    }
  }

  throw new Error(`Retry logic error - should not reach here`);
}
