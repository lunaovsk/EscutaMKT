import { useState, useEffect } from 'react';
import '../../styles/About.css';
import { servicesData } from '../../components/Card/CardInfo.jsx';
import Card from '../../components/Card/Card.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import useReveal from "../../config/useReveal.js";

const AboutCard = () => {
    const { ref, isVisible } = useReveal();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderCard = (item, index) => (
        <Card
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
        />
    );

    return (
        <section className='container-card-about'>
            <div ref={ref} className={`about-header ${isVisible ? "show" : ""}`}>
                {!isMobile && (
                    <div className="aboutcard-desktop-grid">
                        {servicesData.map((cardAbout, index) => (
                            <Card
                                key={index}
                                icon={cardAbout.icon}
                                title={cardAbout.title}
                                description={cardAbout.description}
                            />
                        ))}
                    </div>
                )}
                {isMobile && (
                    <div className="aboutcard-mobile-carousel">
                        <Carousel
                            items={servicesData}
                            variant="aboutcard"
                            itemsPerView={{ desktop: 4, tablet: 2, mobile: 1 }}
                            autoPlay={true}
                            autoPlayInterval={8000}
                            showDots={true}
                            renderItem={renderCard}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutCard;