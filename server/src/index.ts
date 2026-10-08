import express from "express";

const app = express();
const PORT = 3001;

app.get("/api/clubs", (req, res) => {
  const clubs = [
    {
      id: 1,
      name: "DubHacks",
      description:
        "Participate in hackathons and explore technology and entrepreneurship.",
      category: "Technology",
      tags: ["coding", "hackathons", "startups"],
      website: "https://dubhacks.co/",
    },
  ];

  res.json(clubs);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
