import Button from "../Button/Button.jsx";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { headerButtons } from "./NavInfo.jsx";
import { useScroll } from "../../config/useScroll.js";
import "./Navbar.css";

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

    return (
        <header className={`container-header ${scrolled ? "scrolled" : ""}`}>
            <nav className="container-header-nav">
                <div className="container-header-nav-a">
                    <button onClick={() => handleInternalClick("home")} className="btn-home-logo" type="button">Escuta MKT</button>
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