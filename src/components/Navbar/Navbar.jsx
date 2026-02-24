import Button from "../Button/Button.jsx";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { headerButtons } from "./NavInfo.jsx";
import { useScroll } from "../../config/useScroll.js";
import "./Navbar.css";
import logoTop from '../../assets/logo/Logotipo_icon_branco.png';
import logoScrolled from '../../assets/logo/Logotipo_icon.png';

const Navbar = () => {
    const { toSection } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const internalButtons = headerButtons.filter((btn) => !btn.href);
    const externalButtons = headerButtons.filter((btn) => btn.href);

    const handleInternalClick = (target) => {
        toSection(target);
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    const handleLogoClick = () => {
        toSection("home");
        setMobileMenuOpen(false);
    };

    return (
        <header className={`container-header ${scrolled ? "scrolled" : ""}`}>
            <nav className="container-header-nav">
                <div className="logo-wrapper" onClick={handleLogoClick}>
                    <img
                        src={logoTop}
                        alt="Escuta MKT - Logo branca"
                        className={`logo-img logo-top ${scrolled ? 'is-hidden' : ''}`}
                    />
                    <img
                        src={logoScrolled}
                        alt="Escuta MKT - Logo colorida"
                        className={`logo-img logo-scrolled ${scrolled ? '' : 'is-hidden'}`}
                    />
                </div>
                <div className="nav-left">
                    {internalButtons.map((btn) => (
                        <Button
                            key={btn.id}
                            icon={btn.icon}
                            text={btn.text}
                            variant={btn.variant}
                            onClick={() => handleInternalClick(btn.target)}
                        />
                    ))}
                </div>
                <div className="nav-right">
                    {externalButtons.map((btn) => (
                        <Button
                            key={btn.id}
                            icon={btn.icon}
                            text={btn.text}
                            variant={btn.variant}
                            href={btn.href}
                        />
                    ))}
                </div>
                <button className="nav-burger" type="button" aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenuOpen} onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </nav>
            <div className={`nav-mobile ${mobileMenuOpen ? "open" : ""}`}>
                <div className="nav-mobile-links">
                    {internalButtons.map((btn) => (
                        <button key={`m-${btn.id}`} className="btn transparent" type="button" onClick={() => handleInternalClick(btn.target)}>
                            {btn.text}
                        </button>
                    ))}
                    <div className="nav-mobile-cta">
                        {externalButtons.map((btn) => (
                            <Button
                                key={`m-ext-${btn.id}`}
                                icon={btn.icon}
                                text={btn.text}
                                variant={btn.variant}
                                href={btn.href}
                                onClick={() => setMobileMenuOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;