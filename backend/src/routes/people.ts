import { Router } from "express";

const router = Router();


router.get("/people", async (_req, res) => {
  try {
    res.json({ message: "Not implemented yet" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
