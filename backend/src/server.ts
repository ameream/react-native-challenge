import express from "express";
import cors from "cors";
import peopleRoutes from "./routes/people";

const app = express();
app.use(cors());

app.use("/api", peopleRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
