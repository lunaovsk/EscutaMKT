import { useState, useEffect } from 'react';
import { sectionWork } from "../../components/sections/SectionData.js";
import Section from "../../components/Sections/Section.jsx";
import useReveal from "../../config/useReveal.js";
import { stepsData } from "../../components/Card/CardInfo.jsx";
import Card from "../../components/Card/Card.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";
import "../../styles/AboutWork.css";

const AboutWork = () => {
  const { ref, isVisible } = useReveal();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStep = (item, index) => (
    <Card
      key={item.title}
      number={item.number}
      icon={item.icon}
      title={item.title}
      description={item.description}
      variant="work-step"
    />
  );

  return (
    <Section id={sectionWork.id} title={sectionWork.title} paragraph={sectionWork.paragraph}>
      <div ref={ref} className={`about-escuta reveal ${isVisible ? "show" : ""}`}>
        {!isMobile && (
          <div className="work-desktop-grid">
            {stepsData.map((item) => (
              <Card
                key={item.title}
                number={item.number}
                icon={item.icon}
                title={item.title}
                description={item.description}
                variant="work-step"
              />
            ))}
          </div>
        )}

        {isMobile && (
          <div className="work-mobile-carousel">
            <Carousel
              items={stepsData}
              variant="work"
              itemsPerView={{ desktop: 4, tablet: 2, mobile: 1 }}
              autoPlay={true}
              autoPlayInterval={8000}
              showDots={true}
              renderItem={renderStep}
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export default AboutWork;