import Section from "../../components/Sections/Section.jsx"
import useReveal from "../../config/useReveal.js";
import { sectionContact } from "../../components/sections/SectionData.js"
import Forms from "../../components/Form/Forms"
import { data } from "./ContactData.jsx"
import '../../styles/Contact.css'
import Button from '../../components/Button/Button.jsx'
 
const Contact = () => {
    const { ref, isVisible } = useReveal();
    return (
        <div ref={ref} className={`portfolio-grid reveal ${isVisible ? "show" : ""}`}>
            <Section id={sectionContact.id} title={sectionContact.title} paragraph={sectionContact.paragraph}>
                <div className="container-form">
                    <Forms/>
                    <div className="container-info-contact">
                        <h6 className="title-contact">Informações de Contato</h6>
                        <div className="contact-actions">
                            {data.filter(item => item.variant !== "redes" && item.variant !== "redes-blue").map((item, index) => {
                                if (!item.icon && item.text && !item.href) {
                                    return (
                                        <p key={index} className="contact-subtitle">{item.text}</p>
                                    );
                                }
                                return (
                                    <Button
                                        key={index}
                                        icon={item.icon}
                                        text={item.text}
                                        href={item.href}
                                        variant={item.variant}
                                    />
                                );
                            })}

                            <div className="contact-actions-redes">
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
                        <div className="contact-hours">
                            <label className="container-label-cta">Horário de Atendimento</label>
                            <span className="container-span-cta">Segunda a Sexta: 9h às 18h</span>
                            <span className="container-span-cta">Sábados: 9h às 13h</span>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
export default Contact;