import Button from "../../components/Button/Button.jsx";
import { buttonSite } from "../../components/Navbar/NavInfo.jsx";
import { useScroll } from "../../config/useScroll.js";
import '../../styles/Hero.css'
import { useEffect, useState } from "react";

const Hero = () => {
    const { toSection } = useScroll();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    const internalButtons = buttonSite.filter(btn => !btn.href);
    const externalButtons = buttonSite.filter(btn => btn.href);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 640;
    const isTablet = windowWidth > 640 && windowWidth <= 1024;

    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="container-hero">
                <div className="container-hero-text">
                    <h3>Transformamos presença digital em crescimento real de negócio.</h3>
                    <p>
                        Na Escuta MKT, não apenas publicamos conteúdos. Planejamos,
                        executamos e analisamos estratégias baseadas em dados para gerar
                        resultados consistentes e posicionamento de longo prazo.
                    </p>
                </div>
                <div className="container-links">
                    <div className="hero-left">
                        {internalButtons.map(btn => (
                            <Button
                                key={btn.id}
                                icon={btn.icon}
                                text={isMobile ? "Diagnóstico" : btn.text}
                                variant={btn.variant}
                                onClick={() => toSection(btn.target)}
                            />
                        ))}
                    </div>
                    
                    <div className="hero-right">
                        {externalButtons.map(btn => (
                            <Button
                                key={btn.id}
                                icon={btn.icon}
                                text={isMobile ? "WhatsApp" : btn.text}
                                variant={btn.variant}
                                href={btn.href}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="scroll-indicator" aria-hidden="true">
                <div className="scroll-mouse">
                    <div className="scroll-dot"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;