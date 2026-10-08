type ClubCardProps = {
  name: string;
  description: string;
  category: string;
  tags: string[];
};

function ClubCard({
  name,
  description,
  category,
  tags,
}: ClubCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{category}</p>

      <div>
        {tags.map((tag) => (
          <span key={tag}>{tag} </span>
        ))}
      </div>
    </div>
  );
}

export default ClubCard;