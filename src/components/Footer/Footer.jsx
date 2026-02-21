import { data } from "../../sections/contact/ContactData.jsx"
import Button from "../Button/Button.jsx"
import { headerButtons } from "../Navbar/NavInfo"
import { FiPhone, FiMail } from "react-icons/fi";
import { useScroll } from "../../config/useScroll.js";
import './Footer.css'

const Footer = () => {
    const dataFooter = [
        {   
            icon: <FiMail />,
            text: "contato@example.com.br",
            href: "mailto:contato@escutamkt.com.br",
            variant: "footer-cta"

        },
        {   
            icon: <FiPhone/>,
            text: "(99) 9.9999-9999",
            href: "https://wa.me/55SEUNUMERO",
            variant: "footer-cta"
        }
    ]
    const { toSection } = useScroll();
    const internalButtons = headerButtons.filter(btn => !btn.href && btn.variant === "transparent");    

    return (
        
        <footer>
            <div className="container-footer-desc">
                <div className="container-footer-top">
                    <h6 className="title-logo-footer">Escuta MKT</h6>
                    <p className="p-footer">Transformamos presença digital em crescimento real de negócio através de estratégias baseadas em dados e resultados consistentes.</p>
                    <div className="container-redes-footer">
                        {data.filter(item => item.variant === "redes" || item.variant === "redes-blue").map((item, index) => (
                            <Button
                                key={`redes-${index}`}
                                icon={item.icon}
                                text=""
                                href={item.href}
                                variant={item.variant}
                            />
                        ))}
                    </div>
                </div>
                <div className="container-footer-links">
                    <h6 className="title-links">Links Rápidos</h6>
                    {internalButtons.map(btn => (
                        <Button
                            key={btn.id}
                            text={btn.text}
                            variant={btn.variant}
                            onClick={() => toSection(btn.target)}
                        />
                    ))}
                </div>
                <div className="container-footer-contact">
                    <h6 className="title-cta">Contato</h6>
                    <div>
                    {dataFooter.map((item, index) => (
                        <Button
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            href={item.href}
                            variant={item.variant}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="container-footer-bottom">
                <p className="p-footer-bottom">© 2026 Escuta MKT. Todos os direitos reservados.</p>
                <div className="container-links-p-t">
                    <a href="#" target="_blank">Política de Privacidade</a>
                    <a href="#" target="_blank">Termos de Uso</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
