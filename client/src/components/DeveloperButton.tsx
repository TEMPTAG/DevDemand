import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";

export interface DeveloperButtonProps {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  bio: string;
  onClick: () => void;
}

const DeveloperButton: React.FC<DeveloperButtonProps> = ({
  imageUrl,
  firstName,
  lastName,
  bio,
  onClick,
}) => {
  return (
    <Button
      variant="light"
      className="custom-btn d-flex align-items-center mb-2 shadow-sm"
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "left",
        padding: "10px",
      }}
    >
      <Row className="align-items-center w-100">
        <Col xs={3}>
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            roundedCircle
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={9}>
          <div>
            <strong>
              {firstName} {lastName}
            </strong>
          </div>
          <div style={{ fontSize: "0.8rem", color: "#555" }}>
            {bio.length > 60 ? `${bio.substring(0, 60)}...` : bio}
          </div>
        </Col>
      </Row>
    </Button>
  );
};

export default DeveloperButton;
