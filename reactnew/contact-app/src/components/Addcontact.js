import React from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      alert: { message: "", type: "", animation: "" },
    };
  }

  showAlert = (message, type, animation) => {
    this.setState({
      alert: { message, type, animation },
    });

    // Clear the alert after 3 seconds
    setTimeout(() => {
      this.setState({
        alert: { message: "", type: "", animation: "" },
      });
    }, 3000);
  };

  add = async (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      this.showAlert("All fields are mandatory!", "warning", "slide-in-bottom");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      this.showAlert("Please enter a valid email!", "error", "shake");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(trimmedPhone)) {
      this.showAlert(
        "Please enter a valid 10-digit phone number!",
        "error",
        "bounce"
      );
      return;
    }

    try {
      await this.props.addContactHandler({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
      });

      this.showAlert("Contact added successfully!", "success", "zoom-in");

      this.setState({ name: "", email: "", phone: "" });

      setTimeout(() => {
        this.props.navigate("/");
      }, 1000);
    } catch (error) {
      this.showAlert("Failed to add contact!", "error", "fade-in");
      console.error("Add Contact Error:", error.message);
    }
  };

  render() {
    return (
      <div className="full-page">
        <div className="add-contact-container">
          {this.state.alert.message && (
            <Alert
              message={this.state.alert.message}
              type={this.state.alert.type}
              animation={this.state.alert.animation}
            />
          )}

          <h2>Add Contact</h2>
          <form className="ui form" onSubmit={this.add}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="add-button-container">
              <button className="add-button">Add</button>
            </div>
          </form>
          <Link to="/">
            <button className="hello">Back to Contact List</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default AddContact;
