import express from "express";
import { clubs } from "./data/clubs";

const app = express();
const PORT = 3001;

app.get("/api/clubs", (req, res) => {
  res.json(clubs);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
