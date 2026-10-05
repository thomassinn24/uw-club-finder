type ClubCardProps = {
  name: string;
  description: string;
  category: string;
};

function ClubCard({ name, description, category }: ClubCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{category}</p>
    </div>
  );
}

export default ClubCard;