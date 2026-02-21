import Section from '../../components/Sections/Section.jsx'
import useReveal from "../../config/useReveal.js";
import { ctaSection } from '../../components/sections/SectionData.js'
import { btnCta } from '../../components/Navbar/NavInfo.jsx'
import Button from '../../components/Button/Button.jsx'
import '../../styles/CtaSection.css'

const CtaSection = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
    };
    const { ref, isVisible } = useReveal();
    return (
        <div ref={ref} className={`portfolio-grid reveal ${isVisible ? "show" : ""}`}>
            <div className="cta-content">
                <Section title={ctaSection.title} paragraph={ctaSection.paragraph} id="#cta">
                    <div className='cta-actions'>
                        {btnCta.map ((btn, index) => ( 
                            <Button
                                key={index}
                                id={btn.id}
                                icon={btn.icon}
                                text={btn.text}
                                href={btn.href}
                                target={btn.target}
                                variant={btn.variant}   
                                onClick={btn.id === "diagnostic" ? scrollToContact : undefined}
                            /> 
                        ))}  
                    </div> 
                </Section>
            </div>
        </div>
    )
}

export default CtaSection;