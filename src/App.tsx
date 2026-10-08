import { useState } from "react";
import ClubCard from "./components/ClubCard";
import { clubs } from "./data/clubs";

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
    <div>
      <h1>UW Club Finder</h1>
      <p>Find a club that matches your interests.</p>

      <input
        type="text"
        placeholder="Search clubs..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div>
        <button onClick={() => setSelectedCategory("All")}>
          All
        </button>

        <button onClick={() => setSelectedCategory("Technology")}>
          Technology
        </button>

        <button onClick={() => setSelectedCategory("Sports")}>
          Sports
        </button>

        <button onClick={() => setSelectedCategory("Arts")}>
          Arts
        </button>

        <button onClick={() => setSelectedCategory("Business")}>
          Business
        </button>
      </div>

      {filteredClubs.map((club) => (
        <ClubCard
          key={club.id}
          name={club.name}
          description={club.description}
          category={club.category}
          tags={club.tags}
        />
      ))}
    </div>
  );
}

export default App;