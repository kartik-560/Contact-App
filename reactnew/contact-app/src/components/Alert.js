import React from "react";
import "./App.css";

const Alert = ({ message, type, animation, onClose }) => {
  if (!message) return null;

  return (
 <div className={`custom-alert ${type} ${animation}`}>
  <span className="alert-message">{message}</span>
  <button className="close-btn" onClick={onClose}>&times;</button>
</div>

  );
};

export default Alert;
