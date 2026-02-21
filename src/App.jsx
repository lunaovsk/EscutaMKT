import { useState } from 'react'
import './App.css'
import './styles/global.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './sections/hero/Hero.jsx'
import AboutCard from './sections/about/AboutCard.jsx'
import AboutEscuta from './sections/about/AboutEscuta.jsx'
import AboutWork from './sections/about/AboutWork.jsx'
import Services from './sections/service/Services.jsx'
import Portfolio from './sections/portfolio/Portfolio.jsx'
import CtaSection from './sections/contact/CtaSection.jsx'
import Contact from './sections/contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar/>
      <Hero scrollToContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}whatsappUrl="https://wa.me/55SEUNUMERO"/>
      <AboutCard/>
      <AboutEscuta/>
      <AboutWork/>
      <Services/>
      <Portfolio/>
      <CtaSection/> 
      <Contact/>
      <Footer />
    </>
  )
}

export default App
