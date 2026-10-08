
type ClubCardProps = {
  name: string;
  description: string;
  category: string;
  tags: string[];
  website: string;
};

function ClubCard({
  name,
  description,
  category,
  tags,
  website,
}: ClubCardProps) {
  return (
    <article className="club-card">
      <h2>{name}</h2>
      <p className="club-category">{category}</p>
      <p className="club-description">{description}</p>

      <div className="club-tags">
        {tags.map((tag) => (
          <span className="club-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      {website && (
        <a
          className="club-link"
          href={website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Club Website
        </a>
      )}
    </article>
  );
}

export default ClubCard;
