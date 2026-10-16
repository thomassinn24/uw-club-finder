import express from "express";
import { pool } from "./db";
import type { Club } from "../../src/types/Club";

const app = express();
const PORT = 3001;

app.get("/api/clubs", async (req, res) => {
  try {
    const result = await pool.query<Club>("SELECT * FROM clubs");
    const dbClubs = result.rows;
  const category = req.query.category;
  const search = req.query.search;
  const normalizedSearch =
  typeof search === "string" ? search.trim().toLowerCase() : "";

  const filteredClubs =
  typeof category === "string"
    ? dbClubs.filter(
        (club) =>
          club.category.toLowerCase() ===
          category.trim().toLowerCase()
      )
    : dbClubs;

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
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch clubs" });
      }
    });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
