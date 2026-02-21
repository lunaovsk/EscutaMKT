import { btnContact, fields } from '../Navbar/NavInfo.jsx'
import Button from '../Button/Button.jsx';
import './Form.css'

const Forms = ({}) => {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='container-form-contact'>
            <form id='form' onSubmit={onSubmit} className="form-contact">  
                {fields.map((field) => (
                    <div className="container-input" key={field.name}>
                        <label className="inputLabel" htmlFor={field.name}>{field.label}</label>
                        {field.type === "textarea" ? (
                            <textarea id={field.name} name={field.name} placeholder={field.placeholder} className="inputForm textarea" required rows={5}/>
                            ) : (
                            <input id={field.name} type={field.type} name={field.name} placeholder={field.placeholder} className="inputForm" required/>
                        )}
                    </div>
                ))}
                <Button 
                    icon={btnContact.icon}
                    text={btnContact.text}
                    variant={btnContact.variant}  
                    type="submit"            
                 />
            </form>
            
        </div>
    )
}

export default Forms;