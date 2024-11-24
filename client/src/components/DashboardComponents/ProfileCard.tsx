// The ProfileCard component is a child component of the Dashboard component.  It render's the Developer's profile information in a card format.  The component receives the developer's information as props and displays it in a card format.  The component also includes a placeholder animation that is displayed while the data is being loaded.  The component also includes a clickable email link that opens an email modal to send an email to the developer.

import React, { useState } from "react";
import { Card, Placeholder, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaUserAlt,
} from "react-icons/fa";
import EmailModal from "../Modals/EmailModal";

// Interface defining the props for the DeveloperCard component
export interface DeveloperCardProps {
  isLoading: boolean; // Indicates if data is being loaded
  developer: {
    _id: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    telephone: string;
    email: string;
    city: string;
    state: string;
    portfolioLink?: string; // Optional portfolio link
    githubLink?: string; // Optional GitHub link
    hourlyRate: number;
    bio: string;
  };
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  isLoading,
  developer,
}) => {
  // State to manage the visibility of the email modal
  const [showModal, setShowModal] = useState(false);

  // Function to close the email modal
  const handleModalClose = () => setShowModal(false);

  // Function to show the email modal
  const handleModalShow = () => setShowModal(true);

  return (
    <Card className="profile-card mx-auto border shadow p-3 mb-4">
      {isLoading ? (
        // Show a placeholder animation while data is loading
        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      ) : (
        <Row>
          {/* Image and Name Section */}
          <Col md={7} className="d-flex flex-column align-items-center">
            <Card.Img
              variant="top"
              src={
                developer.imageUrl || "/assets/images/profile-placeholder.png"
              }
              className="rounded shadow mb-3"
              style={{
                maxWidth: "400px",
                objectFit: "cover",
              }}
            />
            <Card.Title
              className="text-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              {/* Display the developer's first and last name */}
              {developer.firstName} {developer.lastName}
            </Card.Title>
          </Col>

          {/* Links and Info Section */}
          <Col
            md={5}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Card.Text className="d-flex flex-column align-items-start ">
              {/* Developer's Location - City & State */}
              <Card.Text className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-3" /> {developer.city},{" "}
                {developer.state}
              </Card.Text>

              {/* Developer's Hourly Rate */}
              <Card.Text className="d-flex align-items-center">
                <FaDollarSign className="me-3" /> ${developer.hourlyRate}/hr
              </Card.Text>

              {/* Developer's Clickable Telephone Number - not shown on page */}
              <Card.Text className="d-flex align-items-center">
                <FaPhone style={{ transform: "scaleX(-1)" }} className="me-3" />
                <a
                  href={`tel:${developer.telephone}`}
                  className="text-decoration-none"
                >
                  Call {developer.firstName}
                </a>
              </Card.Text>

              {/* Developer's Email - not shown on page and pushed directly to EmailJS*/}
              <Card.Text className="d-flex align-items-center">
                <FaEnvelope className="me-3" />
                <Card.Link
                  onClick={handleModalShow}
                  style={{
                    cursor: "pointer",
                  }}
                  className="text-decoration-none"
                >
                  Email {developer.firstName}
                </Card.Link>
              </Card.Text>

              {/* Developer's Portfolio Link */}
              <Card.Text className="d-flex align-items-center">
                <FaUserAlt className="me-3" />
                {developer.portfolioLink ? (
                  <Card.Link
                    href={developer.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    View Portfolio
                  </Card.Link>
                ) : (
                  "Portfolio not provided"
                )}
              </Card.Text>

              {/* Developer's GitHub Link */}
              <Card.Text className="d-flex align-items-center">
                <FaGithub className="me-3" />
                {developer.githubLink ? (
                  <Card.Link
                    href={developer.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    View GitHub
                  </Card.Link>
                ) : (
                  "GitHub not provided"
                )}
              </Card.Text>
            </Card.Text>
          </Col>

          {/* Bio Section */}
          <Col xs={12} className="mt-3">
            <Card.Text>{developer.bio}</Card.Text>
          </Col>
        </Row>
      )}

      {/* Email Modal */}
      <EmailModal
        showModal={showModal}
        handleClose={handleModalClose}
        recipientEmail={developer.email}
        recipientName={`${developer.firstName} ${developer.lastName}`}
      />
    </Card>
  );
};

export default DeveloperCard;
