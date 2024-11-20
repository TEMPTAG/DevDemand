import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

interface EmailModalProps {
  showModal: boolean;
  handleClose: () => void;
  recipientEmail: string;
  recipientName: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  showModal,
  handleClose,
  recipientEmail,
  recipientName,
}) => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    message: "",
  });
  const [emailStatus, setEmailStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qhf9c8p",
        "template_h20uqz1",
        {
          user_first_name: formData.userFirstName,
          user_last_name: formData.userLastName,
          user_email: formData.userEmail,
          message: formData.message,
          to_email: recipientEmail,
          to_name: recipientName,
        },
        "nwdLKbHHkiApGQQ4V"
      )
      .then(
        () => {
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
          setEmailStatus("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact {recipientName}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={sendEmail}>
        <Modal.Body>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send Email
          </Button>
        </Modal.Footer>
      </Form>
      {emailStatus && <p className="text-center mt-2">{emailStatus}</p>}
    </Modal>
  );
};

export default EmailModal;
