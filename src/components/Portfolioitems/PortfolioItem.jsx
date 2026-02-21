const PortfolioItem = ({ image, category, title }) => {
  return (
    <article className="portfolio-item">
      <img className="portfolio-img" src={image} alt={title} loading="lazy" />
      <div className="portfolio-overlay">
        <div className="portfolio-overlay-content">
          <span className="portfolio-category">{category}</span>
          <h4 className="portfolio-title">{title}</h4>
        </div>
      </div>
    </article>
  );
};

export default PortfolioItem;