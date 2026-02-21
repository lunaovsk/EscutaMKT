import Section from '../../components/Sections/Section.jsx';
import { sectionServices } from '../../components/sections/SectionData.js';
import useReveal from "../../config/useReveal.js";
import { serviceData } from '../../components/Card/CardInfo.jsx';
import Accordion from '../../components/Accordion/Accordion.jsx';
import Card from '../../components/Card/Card.jsx';
import '../../styles/Services.css';
import '../../styles/Section.css';
import { useState, useEffect } from 'react';

const Services = () => {
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
        <Section id={sectionServices.id} title={sectionServices.title} paragraph={sectionServices.paragraph}>
            <div ref={ref} className={`container-services reveal ${isVisible ? "show" : ""}`}>
                {!isMobile && (
                    <div className="services-desktop-grid">
                        {serviceData.map((item, index) => (
                            <Card
                                key={index}
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
                    <div className="services-mobile-accordion">
                        <Accordion 
                            items={serviceData}
                            variant="default"
                            allowMultiple={false}
                        />
                    </div>
                )}
            </div>
        </Section>
    );
};

export default Services;