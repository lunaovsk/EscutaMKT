import { btnContact, fields } from '../Navbar/NavInfo.jsx';
import Button from '../Button/Button.jsx';
import { useState } from 'react';
import './Form.css';

const Forms = () => {
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        loading: false,
        success: false,
        message: ''
    });

    const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

    const onSubmit = async (e) => {
        e.preventDefault();
        
        setFormStatus({
            submitted: true,
            loading: true,
            success: false,
            message: ''
        });

        const formData = new FormData(e.target);
        formData.append('access_key', WEB3FORMS_KEY);
        formData.append('from_name', 'Site Escuta MKT');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success) {
                setFormStatus({
                    submitted: true,
                    loading: false,
                    success: true,
                    message: 'Mensagem enviada com sucesso! Entraremos em contato em até 2 dias úteis.'
                });
                e.target.reset();
            } else {
                setFormStatus({
                    submitted: true,
                    loading: false,
                    success: false,
                    message: data.message || 'Erro ao enviar mensagem. Por favor, tente novamente.'
                });
            }
        } catch (error) {
            console.error('Erro:', error);
            setFormStatus({
                submitted: true,
                loading: false,
                success: false,
                message: 'Erro de conexão. Verifique sua internet e tente novamente.'
            });
        }
    };

    return (
        <div className='container-form-contact'>
            <form id='form' onSubmit={onSubmit} className="form-contact" method="POST">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                {fields.map((field) => (
                    <div className="container-input" key={field.name}>
                        <label className="inputLabel" htmlFor={field.name}>
                            {field.label}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                className="inputForm textarea"
                                required={field.required}
                                rows={5}
                                disabled={formStatus.loading}
                            />
                        ) : (
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                className="inputForm"
                                required={field.required}
                                disabled={formStatus.loading}
                            />
                        )}
                    </div>
                ))}
                
                <Button 
                    icon={btnContact.icon}
                    text={formStatus.loading ? 'Enviando...' : btnContact.text}
                    variant={btnContact.variant}  
                    type="submit"
                    disabled={formStatus.loading}
                />
                
                {formStatus.message && (
                    <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                        {formStatus.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Forms;