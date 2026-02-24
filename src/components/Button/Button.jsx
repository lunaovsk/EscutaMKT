import './btn.css';

const Button = ({ icon, text, variant, onClick, type = "button", href, disabled = false }) => {

  if (href) {
    return (
      <a 
        href={href}
        className={`btn ${variant} ${disabled ? 'disabled' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        <span className={`container-icon ${variant}`}>{icon}</span>
        {text}
      </a>
    );
  }

  return (
    <button
      className={`btn ${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`container-icon ${variant}`}>{icon}</span>
      {text}
    </button>
  );
};

export default Button;