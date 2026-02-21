import './btn.css'


const Button = ({ icon, text, variant, onClick, type = "button", href }) => {

  if (href) {
    return (
      <a 
        href={href}
        className={`btn ${variant}`}
        target="_blank"
        rel="noopener noreferrer"
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
    >
      <span className={`container-icon ${variant}`}>{icon}</span>
      {text}
    </button>
  );
};

export default Button;
