import React from 'react';
import './Button.css';

const Button = ({ label, className, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
