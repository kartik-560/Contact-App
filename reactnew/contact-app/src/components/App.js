import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import api from "../api/contacts";
import Header from "./Header";
import Contactlist from "./Contactlist";
import Addcontact from "./Addcontact";
import ContactDetails from "./ContactDetails";
import { useNavigate } from "react-router-dom";
import EditContact from "./EditContact";

const ParentComponent = ({ addContactHandler }) => {
  const navigate = useNavigate();
  return (
    <Addcontact addContactHandler={addContactHandler} navigate={navigate} />
  );
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveContacts = async () => {
     console.log("ENV BASE URL:", process.env.REACT_APP_API_BASE_URL);
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addContactHandler = async (contact, navigate) => {
    try {
      const request = { ...contact };
      const response = await api.post("/contacts", request);
      const addedContact = {
        id: response.data.id,
        ...contact,
      };
      setContacts([...contacts, addedContact]);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response);
        if (error.response.status === 404) {
          alert("API endpoint not found! Please check your server.");
        }
      } else {
      }
    }
  };
  // const updateContactHandler = async (updatedContact) => {
  //   try {
  //     const response = await api.put(
  //       `/contacts/${updatedContact.id}`,
  //       updatedContact
  //     );

  //     if (response.status === 200) {
  //       setContacts((prevContacts) =>
  //         prevContacts.map((contact) =>
  //           contact.id === updatedContact.id ? response.data : contact
  //         )
  //       );
  //       console.log("Contact updated successfully:", response.data);
  //       return Promise.resolve();
  //     } else {
  //       throw new Error("Update failed");
  //     }
  //   } catch (error) {
  //     console.error("Error updating contact:", error.message);
  //     return Promise.reject(error);
  //   }
  // };

const updateContactHandler = async (updatedContact) => {
  try {
    const response = await api.put(
      `/contacts/${updatedContact.id}`,
      updatedContact
    );

    if (response.status === 200) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContact.id ? response.data : contact
        )
      );
      console.log("Contact updated successfully:", response.data);
      return true;  // Explicitly return true on success
    } else {
      console.error("Unexpected response status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return false;  // Return false on failure
  }
};


const removeContactHandler = async (id) => {
  try {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
    console.log("Contact deleted successfully!");
    // Remove any native alert here
  } catch (error) {
    console.error("Error deleting contact:", error.message);
  }
};



  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
      setLoading(false);
    };
    getAllContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Contactlist
              contacts={contacts}
              setContacts={setContacts}
              getContactId={removeContactHandler}
            />
          }
        />
        <Route
          path="/add"
          element={<ParentComponent addContactHandler={addContactHandler} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditContact
              updateContactHandler={updateContactHandler}
              contacts={contacts}
              
            />
          }
        />

        <Route
          path="/contact/:id"
          element={<ContactDetails contacts={contacts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
