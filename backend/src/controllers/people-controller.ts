import type { Request, Response } from "express";

import type { OrganizedData } from "../models";
import { SWAPIService } from "../services";
import { BaseController } from "./base-controller";

/**
 * Controller for handling Star Wars people-related API endpoints.
 * Extends BaseController to inherit common functionality like error handling and response utilities.
 */
export class PeopleController extends BaseController {
  /**
   * Creates an instance of PeopleController.
   *
   * @param swapiService - The SWAPI service instance for fetching Star Wars data.
   *                      Defaults to a new SWAPIService instance if not provided.
   */
  constructor(private readonly swapiService = new SWAPIService()) {
    super();
  }

  /**
   * Retrieves and returns organized Star Wars people data grouped by species.
   * Fetches data from the Star Wars API (SWAPI) and organizes it by species,
   * including people information.
   *
   * @param _req - The Express request object (unused in this endpoint)
   * @param res - The Express response object used to send the organized data
   *
   * @returns Promise<void> - Resolves when the response has been sent
   *
   * @throws Will be handled by the asyncHandler wrapper, which catches errors
   *         and delegates to the BaseController's error handling
   *
   * @example
   * GET /api/people
   * Response:
   * {
   *   "Human": [
   *     {
   *       "name": "Luke Skywalker",
   *       "height": "172",
   *       "mass": "77",
   *       "gender": "male",
   *       "homeworld": "Tatooine"
   *     },
   *     ...
   *   ],
   *   "Droid": [
   *     {
   *       "name": "C-3PO",
   *       "height": "167",
   *       "mass": "75",
   *       "gender": "male",
   *       "homeworld": "Tatooine"
   *     },
   *     ...
   *   ],
   *   ...
   * }
   */
  getPeople = this.asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const organizedData: OrganizedData =
        await this.swapiService.getOrganizedStarWarsData();
      this.sendSuccess(res, organizedData);
    },
  );
}
