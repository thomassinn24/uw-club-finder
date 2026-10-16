import { useEffect, useState } from "react";
import type { Club } from "./types/Club";
import ClubCard from "./components/ClubCard";
import "./App.css";

function App() {

  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const url = `/api/clubs?search=${encodeURIComponent(search)}${
      selectedCategory === "All"
        ? ""
        : `&category=${encodeURIComponent(selectedCategory)}`
    }`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        return response.json();
      })
      .then((data) => {
        if (!controller.signal.aborted) {
          setClubs(data);
          setError(null);
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        setError("Failed to load clubs. Please try again later.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });
  return () => controller.abort(); }, [search, selectedCategory]);

 const filteredClubs = clubs;

return (
  <div className="app">
    <header className="header">
      <h1>UW Club Finder</h1>
      <p>Discover student organizations that match your interests.</p>
    </header>

    <input
      className="search-input"
      type="text"
      placeholder="Search clubs..."
      value={search}
      onChange={(e) => {
        setLoading(true);
        setError(null);
        setSearch(e.target.value);
      }}
    />

    <div className="category-filters">
      {["All", "Technology", "Sports", "Arts", "Business"].map(
        (category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => {
              if (selectedCategory === category) {
                return;
              }
              
              setLoading(true);
              setError(null);
              setSelectedCategory(category);
            }}
          >
            {category}
          </button>
        )
      )}
    </div>

    <div className="clubs-grid">
      {loading ? (
        <p>Loading clubs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredClubs.length === 0 ? (
        <p>No clubs found.</p>
      ) : (
        filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            name={club.name}
            description={club.description}
            category={club.category}
            tags={club.tags}
            website={club.website}
          />
        ))
      )}
    </div>
  </div>
);
}

export default App;