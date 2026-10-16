import express from "express";
import { clubs } from "./data/clubs";

const app = express();
const PORT = 3001;

app.get("/api/clubs", (req, res) => {
  const category = req.query.category;
  const search = req.query.search;
  const normalizedSearch =
  typeof search === "string" ? search.trim().toLowerCase() : "";

  const filteredClubs =
  typeof category === "string"
    ? clubs.filter(
        (club) =>
          club.category.toLowerCase() ===
          category.trim().toLowerCase()
      )
    : clubs;

  const searchResults =
  typeof search === "string"
    ? filteredClubs.filter(
        (club) =>
          club.name.toLowerCase().includes(normalizedSearch) ||
          club.description.toLowerCase().includes(normalizedSearch) ||
          club.category.toLowerCase().includes(normalizedSearch) ||
          club.tags.some((tag) =>
            tag.toLowerCase().includes(normalizedSearch)
          )
      )
    : filteredClubs;

  res.json(searchResults);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
