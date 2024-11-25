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

export interface DeveloperCardProps {
  isLoading: boolean;
  developer: {
    _id: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    telephone: string;
    email: string;
    city: string;
    state: string;
    portfolioLink?: string;
    githubLink?: string;
    hourlyRate: number;
    bio: string;
  };
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  isLoading,
  developer,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <Card className="profile-card mx-auto border shadow p-3 mb-4">
      {isLoading ? (
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
              {developer.firstName} {developer.lastName}
            </Card.Title>
          </Col>

          {/* Links and Info Section */}
          <Col md={5} className="d-flex flex-column justify-content-center">
            <Card.Text className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-3" /> {developer.city},{" "}
              {developer.state}
            </Card.Text>
            <Card.Text className="d-flex align-items-center">
              <FaDollarSign className="me-3" /> ${developer.hourlyRate.toFixed(2)}/hr
            </Card.Text>
            <Card.Text className="d-flex align-items-center">
              <FaPhone style={{ transform: "scaleX(-1)" }} className="me-3" />
              <a
                href={`tel:${developer.telephone}`}
                className="text-decoration-none"
              >
                Call {developer.firstName}
              </a>
            </Card.Text>
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
