import "./Card.css";

const Card = ({ number, icon, title, description, items, variant }) => {
  const showDescription = variant === "services"; 
  return (
    <div className={`container-cards ${variant}`}>
      <div className="container-cards-titles">
        {number && <div className="number">{number}</div>}
        <div className="icon">{icon}</div>
        <h4 className="title-tech">{title}</h4>
      </div>
      <div className="container-tags">
        {showDescription && description && (
          <p className="container-description-p">{description}</p>
        )}
        {items?.length > 0 ? (
          <ul className="container-description">
            {items.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : (
          !showDescription && description && (
            <p className="container-description-p">{description}</p>
          )
        )}
      </div>
    </div>
  );
};


export default Card;
