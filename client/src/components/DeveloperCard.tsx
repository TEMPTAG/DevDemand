import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import emailjs from "emailjs-com";

export interface DeveloperCardProps {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  city: string;
  state: string;
  portfolioLink: string;
  githubLink: string;
  hourlyRate: number;
  bio: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  imageUrl,
  firstName,
  lastName,
  telephone,
  email,
  city,
  state,
  portfolioLink,
  githubLink,
  hourlyRate,
  bio,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    message: "",
  });
  const [emailStatus, setEmailStatus] = useState("");

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

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
          to_email: email,
          to_name: `${firstName} ${lastName}`,
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
          setShowModal(false);
        },
        () => {
          setEmailStatus("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <>
      <Card className="mb-4 p-3 shadow" style={{ width: "100%" }}>
        <Row>
          <Col xs={12} md={4} className="text-center">
            <Card.Img
              src={imageUrl}
              alt={`Profile picture of ${firstName} ${lastName}`}
              style={{
                maxHeight: "300px",
                width: "100%",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />
            <Card.Title as="h2">
              {firstName} {lastName}
            </Card.Title>
          </Col>
          <Col xs={12} md={8}>
            <Card.Text>
              <strong>Location:</strong> {city}, {state}
              <br />
              <strong>Hourly Rate:</strong> ${hourlyRate}/hr
              <br />
              <strong>About:</strong> {bio}
            </Card.Text>
            <Button className="custom-btn m-2" onClick={handleModalShow}>
              Email {firstName}
            </Button>
            <Button
              className="custom-btn m-2"
              href={`tel:${telephone}`}
              aria-label={`Call ${firstName}`}
            >
              Call {firstName}
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} className="d-flex justify-content-between">
            <Button
              href={portfolioLink}
              className="custom-btn m-2"
              target="_blank"
              aria-label={`${firstName} ${lastName}'s portfolio`}
            >
              View My Portfolio Website
            </Button>
            <Button
              href={githubLink}
              className="custom-btn m-2"
              target="_blank"
              aria-label={`${firstName} ${lastName}'s GitHub profile`}
            >
              View My GitHub Profile
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Email Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact {firstName}</Modal.Title>
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
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {emailStatus && <p className="text-center mt-2">{emailStatus}</p>}
    </>
  );
};

export default DeveloperCard;
