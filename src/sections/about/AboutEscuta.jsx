import { sectionAbout } from "../../components/sections/SectionData.js";
import Section from "../../components/Sections/Section.jsx";
import useReveal from "../../config/useReveal.js";
import { aboutInfo } from '../../components/Card/CardInfo.jsx';
import Accordion from '../../components/Accordion/Accordion.jsx';
import Card from '../../components/Card/Card.jsx';
import '../../styles/AboutEscuta.css';
import '../../styles/Section.css';
import { useState, useEffect } from 'react';

const AboutEscuta = () => {
    const { ref, isVisible } = useReveal();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Section id={sectionAbout.id} title={sectionAbout.title} paragraph={sectionAbout.paragraph}>
            <div ref={ref} className={`about-escuta reveal ${isVisible ? "show" : ""}`}>
                {!isMobile && (
                    <div className="about-desktop-grid">
                        {aboutInfo.map((item) => (
                            <Card
                                key={item.title}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                items={item.items}
                                variant={item.variant}
                            />
                        ))}
                    </div>
                )}
                {isMobile && (
                    <div className="about-mobile-accordion">
                        <Accordion 
                            items={aboutInfo}
                            variant="about"
                            allowMultiple={false}
                            defaultOpen={[0]} 
                        />
                    </div>
                )}
            </div>
        </Section>
    );
};

export default AboutEscuta;