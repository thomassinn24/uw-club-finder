import { useState } from "react";
import ClubCard from "./components/ClubCard";

type Club = {
  name: string;
  description: string;
  category: string;
};

const clubs: Club[] = [
  {
    name: "Husky Coding Project",
    description: "Build software projects with other UW students.",
    category: "Technology",
  },
  {
    name: "DubHacks",
    description: "Build projects and participate in hackathons.",
    category: "Technology",
  },
  {
    name: "Husky Running Club",
    description: "Run and train with other UW students.",
    category: "Sports",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredClubs = clubs.filter((club) => {
    const query = search.toLowerCase();

    const matchesSearch =
      club.name.toLowerCase().includes(query) ||
      club.description.toLowerCase().includes(query) ||
      club.category.toLowerCase().includes(query);

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
      </div>

      {filteredClubs.map((club) => (
        <ClubCard
          key={club.name}
          name={club.name}
          description={club.description}
          category={club.category}
        />
      ))}
    </div>
  );
}

export default App;