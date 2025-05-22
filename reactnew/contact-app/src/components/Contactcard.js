import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import "./App.css"; // Import the new CSS

const ContactCard = (props) => {
  const { id, name, email, phone } = props.contact;
  const [alert, setAlert] = useState({ message: "", type: "", animation: "" });

  const showAlert = (message, type, animation) => {
    setAlert({ message, type, animation });
    setTimeout(() => {
      setAlert({ message: "", type: "", animation: "" });
    }, 3000);
  };

  const handleDelete = async () => {
    try {
      await props.clickHandler(id);
      showAlert("Contact deleted successfully!", "success", "slide-in");
    } catch (error) {
      showAlert("Failed to delete contact!", "error", "fade-in");
      console.error("Error deleting contact:", error.message);
    }
  };

  return (
    <div className="contact-item">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          animation={alert.animation}
          onClose={() => setAlert({ message: "", type: "", animation: "" })}
        />
      )}
      <img className="avatar-image" src={user} alt="user" />
      <div className="contact-content">
        <Link to={`/contact/${id}`}>
          <div className="contact-header">{name}</div>
          <div className="contact-email">
            <FontAwesomeIcon icon={faEnvelope} className="icon-color" /> {email}
          </div>
          <div className="contact-phone">
            <FontAwesomeIcon icon={faPhone} className="icon" /> {phone}
          </div>
        </Link>
      </div>
      <div className="action-icons">
        <i
          className="trash alternate outline icon action-icon trash-icon"
          onClick={handleDelete}
        ></i>
        <Link to={`/edit/${id}`}>
          <i className="edit alternate outline icon action-icon edit-icon"></i>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
