import { FaFileAlt, FaWhatsapp } from "react-icons/fa";
import { LuSend } from "react-icons/lu";


export const headerButtons = [
  { id: "about", text: "Sobre", variant: "transparent", target: "about" },
  { id: "services", text: "Serviços", variant: "transparent", target: "services" },
  { id: "portfolio", text: "Portfólio", variant: "transparent", target: "portfolio" },
  { id: "contact", text: "Contato", variant: "transparent", target: "contact" },
  {
    id: "whatsapp",
    text: "WhatsApp",
    variant: "background-orange",
    href: "https://wa.me/55SEUNUMERO",
    icon: <FaWhatsapp/>
  }
];

export const buttonSite = [
  {
    id: "diagnostic",
    text: "Solicitar Diagnóstico Estratégico",
    variant: "background",
    target: "contact",
    icon: <FaFileAlt/>
  },
  {
    id: "talk-whatsapp",
    text: "Falar no WhatsApp",
    variant: "background-transparent",
    href: "https://wa.me/55SEUNUMERO",
    icon: <FaWhatsapp/>
  }
];

export const btnCta = [
  {
    id: "talk-whatsapp",
    text: "Falar no WhatsApp",
    variant: "bg-white",
    href: "https://wa.me/55SEUNUMERO",
    icon: <FaWhatsapp/>
    
  },
  {
    id: "diagnostic",
    text: "Solicitar Diagnóstico",
    variant: "bg-transparent",
    target: "contact",
    icon: <FaFileAlt/>
  }
];

export const btnContact = {
  icon: <LuSend/>,
  text: "Enviar Mensagem",
  variant: "contact-submit",
}

export const fields = [
  {
    label: "Nome *",
    type: "text",
    name: "name", 
    placeholder: "Seu nome completo",
    required: true
  },
  {
    label: "E-mail *",
    type: "email",
    name: "email",
    placeholder: "seu@email.com",
    required: true
  },
  {
    label: "Empresa",
    type: "text",
    name: "subject",
    placeholder: "Nome da sua empresa",
    required: false
  },
  {
    label: "Mensagem *",
    type: "textarea",
    name: "message",
    placeholder: "Conte-nos sobre seu projeto ou necessidade...",
    required: true
  }
];