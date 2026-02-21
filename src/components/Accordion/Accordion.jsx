import { useState } from 'react';
import './Accordion.css';

const Accordion = ({ 
  items, 
  variant = 'default',
  allowMultiple = false,
  defaultOpen = []
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`accordion-container accordion-${variant}`}>
        {items.map((item, index) => (
            <div key={index} className="accordion-item">
                <button className={`accordion-header ${openItems.includes(index) ? 'active' : ''}`} onClick={() => toggleItem(index)} aria-expanded={openItems.includes(index)}>
                    <div className="accordion-header-left">
                        {item.icon && <span className="accordion-icon">{item.icon}</span>}
                        <h4 className="accordion-title">{item.title}</h4>
                    </div>
                    <span className="accordion-arrow">
                        {openItems.includes(index) ? '−' : '+'}
                    </span>
                </button>
                <div className={`accordion-content ${openItems.includes(index) ? 'open' : ''}`} aria-hidden={!openItems.includes(index)}>
                    <div className="accordion-content-inner">
                        {item.description && (
                            <p className="accordion-description">{item.description}</p>
                        )}
                    
                        {item.items && item.items.length > 0 && (
                            <ul className="accordion-list">
                                {item.items.map((text, i) => (
                                    <li key={i}>{text}</li>
                                ))}
                            </ul>
                        )}
                            {item.content}
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default Accordion;