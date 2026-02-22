import { useState, useEffect } from 'react';
import Section from "../../components/Sections/Section.jsx";
import useReveal from "../../config/useReveal.js";
import PortfolioItem from "../../components/Portfolioitems/portfolioItem.jsx";
import { portfolioItems } from "../../components/Portfolioitems/PortfolioData.js";
import Carousel from "../../components/Carousel/Carousel.jsx";
import "../../styles/Portfolio.css"; 
import { sectionPortfolio } from '../../components/sections/SectionData.js';

const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 640 && window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640);
      setIsTablet(width > 640 && width <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPortfolioItem = (item, index) => (
    <PortfolioItem
      key={`${item.category}-${item.title}-${index}`}
      image={item.image}
      category={item.category}
      title={item.title}
    />
  );

  return (
    <Section id={sectionPortfolio.id} title={sectionPortfolio.title} paragraph={sectionPortfolio.paragraph}>
      <div ref={ref} className={`portfolio-content reveal ${isVisible ? "show" : ""}`}>
        {!isMobile && !isTablet && (
          <div className="portfolio-desktop-grid">
            {portfolioItems.map((item, index) => (
              <PortfolioItem
                key={`${item.category}-${item.title}-${index}`}
                image={item.image}
                category={item.category}
                title={item.title}
              />
            ))}
          </div>
        )}

        {isTablet && (
          <div className="portfolio-tablet-grid">
            {portfolioItems.map((item, index) => (
              <PortfolioItem
                key={`${item.category}-${item.title}-${index}`}
                image={item.image}
                category={item.category}
                title={item.title}
              />
            ))}
          </div>
        )}

        {isMobile && (
          <div className="portfolio-mobile-carousel">
            <Carousel
              items={portfolioItems}
              variant="portfolio"
              itemsPerView={{ desktop: 3, tablet: 2, mobile: 1 }}
              autoPlay={true}
              autoPlayInterval={8000}
              showDots={true}
              renderItem={renderPortfolioItem}
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export default Portfolio;