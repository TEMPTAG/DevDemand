// The Email Modal component is a child component of the ProfileCard component. It renders a modal that allows users to send an email to the developer whose profile is being viewed. The modal includes input fields for the user's first name, last name, email address, and message, as well as buttons to send the email or cancel. The component uses the emailjs library to send the email, and displays a status message based on the success or failure of the email sending process. The component is used to allow users to contact developers directly from their profile page.

import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

// Props interface for the EmailModal component
interface EmailModalProps {
  showModal: boolean; // Controls whether the modal is visible
  handleClose: () => void; // Function to close the modal
  recipientEmail: string; // Email address of the developer being contacted
  recipientName: string; // Name of the developer being contacted
}

// EmailModal component
const EmailModal: React.FC<EmailModalProps> = ({
  showModal,
  handleClose,
  recipientEmail,
  recipientName,
}) => {
  // State for managing form data input by the user
  const [formData, setFormData] = useState({
    userFirstName: "", // User's first name
    userLastName: "", // User's last name
    userEmail: "", // User's email address
    message: "", // Message from the user
  });

  // State to manage the status of the email sending process
  const [emailStatus, setEmailStatus] = useState("");

  // Handle changes in input fields and update the corresponding formData property
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send the email using emailjs
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call emailjs to send the email
    emailjs
      .send(
        "service_qhf9c8p", // EmailJS service ID
        "template_h20uqz1", // EmailJS template ID
        {
          user_first_name: formData.userFirstName, // User's first name
          user_last_name: formData.userLastName, // User's last name
          user_email: formData.userEmail, // User's email address
          message: formData.message, // User's message
          to_email: recipientEmail, // Recipient's email address
          to_name: recipientName, // Recipient's name
        },
        "nwdLKbHHkiApGQQ4V" // EmailJS user ID
      )
      .then(
        () => {
          // Handle success - display a success message, reset the form, and close the modal
          setEmailStatus("Email sent successfully!");
          setFormData({
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            message: "",
          });
          handleClose();
        },
        () => {
          // Handle failure - display an error message
          setEmailStatus("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>Contact {recipientName}</Modal.Title>
      </Modal.Header>

      {/* Email Form */}
      <Form onSubmit={sendEmail}>
        <Modal.Body>
          {/* First Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Your First Name</Form.Label>
            <Form.Control
              type="text"
              name="userFirstName"
              value={formData.userFirstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              required
            />
          </Form.Group>

          {/* Last Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control
              type="text"
              name="userLastName"
              value={formData.userLastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              required
            />
          </Form.Group>

          {/* Email Address Input */}
          <Form.Group className="mb-3">
            <Form.Label>Your Email Address</Form.Label>
            <Form.Control
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          {/* Message Input */}
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
              required
            />
          </Form.Group>
        </Modal.Body>

        {/* Modal Footer with Cancel and Send Buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="custom-btn">
            Send Email
          </Button>
        </Modal.Footer>
      </Form>

      {/* Display Email Status Message */}
      {emailStatus && <p className="text-center mt-2">{emailStatus}</p>}
    </Modal>
  );
};

export default EmailModal;
