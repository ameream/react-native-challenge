import { Router } from "express";

import { PeopleController } from "../controllers";

const router = Router();
const peopleController = new PeopleController();

// GET /api/people - returns organized Star Wars people data grouped by species
router.get("/people", peopleController.getPeople);

export default router;
