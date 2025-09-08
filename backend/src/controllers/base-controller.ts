import type { Request, Response } from "express";

/**
 * Base controller class that provides common functionality for all controllers.
 * Includes error handling, response utilities, and async method wrapping.
 */
export abstract class BaseController {
  /**
   * Wraps async controller methods with error handling.
   * Automatically catches any errors thrown by the wrapped function and delegates
   * error handling to the handleError method.
   *
   * @param fn - The async function to wrap (controller method)
   * @returns A wrapped function that handles errors automatically
   *
   * @example
   * ```typescript
   * public getUsers = this.asyncHandler(async (req, res) => {
   *   const users = await userService.getAll();
   *   this.sendSuccess(res, users);
   * });
   * ```
   */
  protected asyncHandler = (
    fn: (req: Request, res: Response) => Promise<void>,
  ) => {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        await fn(req, res);
      } catch (error) {
        this.handleError(error, req, res);
      }
    };
  };

  /**
   * Centralized error handling for all controller methods.
   * Logs the error with request context and sends a standardized error response.
   *
   * @param error - The error that occurred (can be any type)
   * @param req - The Express request object for context
   * @param res - The Express response object to send error response
   *
   * @remarks
   * Always sends a 500 status code with a generic "Internal server error" message
   * to avoid exposing sensitive error details to clients.
   */
  protected handleError(error: unknown, req: Request, res: Response): void {
    console.error(`Error in ${req.method} ${req.path}:`, error);
    if (error instanceof Error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  /**
   * Sends a successful JSON response with the provided data.
   *
   * @template T - The type of the data being sent
   * @param res - The Express response object
   * @param data - The data to send in the response body
   * @param statusCode - The HTTP status code (defaults to 200)
   *
   * @example
   * ```typescript
   * this.sendSuccess(res, { users: [...] }, 200);
   * this.sendSuccess(res, { message: "Created" }, 201);
   * ```
   */
  protected sendSuccess<T>(
    res: Response,
    data: T,
    statusCode: number = 200,
  ): void {
    res.status(statusCode).json(data);
  }

  /**
   * Sends an error response with a custom message and status code.
   * Used for expected/handled errors (validation errors, not found, etc.).
   *
   * @param res - The Express response object
   * @param message - The error message to send to the client
   * @param statusCode - The HTTP status code (defaults to 400)
   *
   * @remarks
   * Currently unused, but kept for future implementation.
   *
   * @example
   * ```typescript
   * this.sendError(res, "User not found", 404);
   * this.sendError(res, "Invalid input data"); // defaults to 400
   * ```
   */
  protected sendError(
    res: Response,
    message: string,
    statusCode: number = 400,
  ): void {
    res.status(statusCode).json({ error: message });
  }
}
