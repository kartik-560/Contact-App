import React, { useState, useEffect } from "react";
import Contactcard from "./Contactcard";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/contacts";

const Contactlist = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const deleteContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      const newContactList = props.contacts.filter(
        (contact) => contact.id !== id
      );
      props.setContacts(newContactList);
      setFilteredContacts(newContactList);
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await api.get("/contacts");
        props.setContacts(response.data);
        setFilteredContacts(response.data); // Initialize filtered contacts
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    getAllContacts();
  }, []);

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredContacts(props.contacts);
      return;
    }

    const filtered = props.contacts.filter((contact) => {
      const nameMatch =
        contact.name && contact.name.toLowerCase().includes(searchValue);
      const emailMatch =
        contact.email && contact.email.toLowerCase().includes(searchValue);
      const phoneMatch =
        contact.phone && contact.phone.toString().includes(searchValue);

      return nameMatch || emailMatch || phoneMatch;
    });

    setFilteredContacts(filtered.length > 0 ? filtered : []);
  };

  const renderContactList =
    filteredContacts.length > 0 ? (
      filteredContacts.map((contact) => (
        <div key={contact.id}>
          <Contactcard contact={contact} clickHandler={deleteContactHandler} />
        </div>
      ))
    ) : (
      <div className="no-contact-message">No contacts available</div>
    );

  return (
    // <div className="full-page">
    //   <div className="contact-list-container">
    //     <center>
    //       <h2 className="center-title">Contact List</h2>
    //     </center>
    //     <div className="add-contact-button-container">
    //       <Link to="/add">
    //         <button className="add-contact-button">Add Contact</button>
    //       </Link>
    //     </div>

    //     <input
    //       type="text"
    //       placeholder="Search contacts..."
    //       value={searchTerm}
    //       onChange={handleSearch}
    //       className="search-bar"
    //     />
    //     {filteredContacts.length === 0 && props.contacts.length === 0 && (
    //       <div className="no-contact-message">No contacts available</div>
    //     )}
    //    <div className="contact-card-list">
    //       <div className="ui celled list">{renderContactList}</div>
    //     </div>
    //   </div>
    // </div>
<div className="full-page1">
    <div className="contact-list-container">
  <center>
    <h2 className="center-title">Contact List</h2>
  </center>
  <div className="add-contact-button-container">
    <Link to="/add">
      <button className="add-contact-button">Add Contact</button>
    </Link>
  </div>
  <input
    type="text"
    placeholder="Search contacts..."
    value={searchTerm}
    onChange={handleSearch}
    className="search-bar"
  />

  <div className="contact-card-list">
    {renderContactList}
  </div>
</div>
</div>
  );
};

export default Contactlist;
