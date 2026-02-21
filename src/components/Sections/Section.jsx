const Section = ({id, title, paragraph, children}) => {
    return (
        <section id={id}>
            <h5>{title}</h5>
            <p className='section-paragraph'>{paragraph}</p>
            {children}
        </section>
    )
}

export default Section;