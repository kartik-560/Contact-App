import React from "react";
import { useParams, Link } from "react-router-dom";
import user from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const ContactDetails = ({ contacts }) => {
  const { id } = useParams();
  const contact = contacts.find((contact) => String(contact.id) === id);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  // Check if contact exists
  if (!contact || Object.keys(contact).length === 0) {
    return (
      <div className="main1">
        <h2>No Contact Available</h2>
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    );
  }

  const { name, email, phone } = contact;

  return (
    <div className="full-page2">
      <div className="main2">
        <div className="contact-card">
          <div className="image">
            <img src={user} alt="user" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
            <div className="description">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} className="icon-color" />
              {email}
            </div>
            <div className="description">
              {" "}
              <FontAwesomeIcon icon={faPhone} className="icon" />
              {phone}
            </div>
          </div>
          <Link to="/">
            <button className="back-button">Back to Contact List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
