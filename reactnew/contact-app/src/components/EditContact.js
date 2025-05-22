import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Alert from "./Alert";
import "./App.css"; // Import the new CSS
const EditContact = ({ updateContactHandler, contacts }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alert, setAlert] = useState({ message: "", type: "", animation: "" });
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (Array.isArray(contacts) && contacts.length > 0) {
      const contactToEdit = contacts.find(
        (contact) => String(contact.id) === id
      );
      if (contactToEdit) {
        setContact(contactToEdit);
      }
    }
  }, [contacts, id]);


  
  const showAlert = (message, type = "default", animation = "slide-in") => {
  setAlert({ message, type, animation });
  setTimeout(() => {
    setAlert({ message: "", type: "", animation: "" });
  }, 3000);
};


// const update = async (e) => {
//   e.preventDefault();

//   if (contact.name === "" || contact.email === "" || contact.phone === "") {
//     showAlert("All fields are mandatory!", "warning", "slide-in-bottom");
//     return;
//   }

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(contact.email)) {
//     showAlert("Please enter a valid email!", "error", "shake");
//     return;
//   }

//   const phonePattern = /^[0-9]{10}$/;
//   if (!phonePattern.test(contact.phone)) {
//     showAlert("Please enter a valid 10-digit phone number!", "error", "bounce");
//     return;
//   }

//   try {
//     await updateContactHandler(contact);
//     showAlert("Contact updated successfully!", "success", "zoom-in");
//     navigate("/");
//   } catch (error) {
//     showAlert("Failed to update contact!", "error", "fade-in");
//   }
// };

const update = async (e) => {
  e.preventDefault();

  if (contact.name === "" || contact.email === "" || contact.phone === "") {
    showAlert("All fields are mandatory!", "warning", "slide-in-bottom");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(contact.email)) {
    showAlert("Please enter a valid email!", "error", "shake");
    return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(contact.phone)) {
    showAlert("Please enter a valid 10-digit phone number!", "error", "bounce");
    return;
  }

  try {
    // Await the update operation to ensure it completes
    const response = await updateContactHandler(contact);

    // Check if the update was successful
    if (response) {
      console.log("Update successful. Showing success alert.");
      // Show success alert after update completes
      showAlert("Contact updated successfully!", "success", "zoom-in");

      // Delay navigation to ensure alert visibility
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      throw new Error("Update failed");
    }
  } catch (error) {
    // Display an error alert in case of failure
    console.error("Update Error:", error.message);
    showAlert("Failed to update contact!", "error", "fade-in");
  }
};

  return (
    <div className="full-page">
      <div className="edit-contact-container">
        {alert.message && (
          <Alert
            message={alert.message}
            type={alert.type}
            animation={alert.animation}
          />
        )}
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </div>
          <div className="update-button-container">
            <button className="update-button">Update</button>
          </div>
        </form>
        <Link to="/">
          <button className="hello">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default EditContact;
