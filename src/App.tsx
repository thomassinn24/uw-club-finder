import { useState } from "react";
import ClubCard from "./components/ClubCard";
import { clubs } from "./data/clubs";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredClubs = clubs.filter((club) => {
    const query = search.toLowerCase();

    const matchesSearch =
      club.name.toLowerCase().includes(query) ||
      club.description.toLowerCase().includes(query) ||
      club.category.toLowerCase().includes(query) ||
      club.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All" ||
      club.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
      onChange={(event) => setSearch(event.target.value)}
    />

    <div className="category-filters">
      {["All", "Technology", "Sports", "Arts", "Business"].map(
        (category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        )
      )}
    </div>

    <div className="clubs-grid">
      {filteredClubs.map((club) => (
        <ClubCard
          key={club.id}
          name={club.name}
          description={club.description}
          category={club.category}
          tags={club.tags}
          website={club.website}
        />
      ))}
    </div>
  </div>
);
}

export default App;