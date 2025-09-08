import cors from "cors";
import express from "express";

import { peopleRoutes } from "./routes";

const app = express();

// constants
const BASE_URL = "/api";
const PORT = 4000;

// middlewares
app.use(cors());

// routes
app.use(BASE_URL, peopleRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
