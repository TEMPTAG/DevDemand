// The DeveloperButton component is a child component of the Dashboard component.  It renders a button that displays the developer's profile image, name, and truncated bio.  The component receives the developer's information as props and displays it in a button format.  The button can be clicked to select the developer, and the selected developer is highlighted with a different style.  The component also includes a function to handle the click event and pass the developer's ID to the parent component.  The component is used to display a list of developers in the dashboard for selection.

import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";

// Props interface defining the expected properties for the DeveloperButton component
export interface DeveloperButtonProps {
  _id: string; // Unique identifier for the developer
  imageUrl: string; // URL or Blob of the developer's profile image
  firstName: string; // Developer's first name
  lastName: string; // Developer's last name
  bio: string; // Developer's bio or description
  onClick: (id: string) => void; // Callback function triggered on button click, passing the developer's ID
  isActive: boolean; // Indicates if this developer is currently selected
}

// DeveloperButton component that displays a button with the developer's profile information
const DeveloperButton: React.FC<DeveloperButtonProps> = ({
  _id,
  imageUrl,
  firstName,
  lastName,
  bio,
  onClick,
  isActive,
}) => {
  return (
    <Button
      variant="light"
      className={`custom-btn d-flex align-items-center mb-2 shadow-sm ${
        isActive ? "active-btn" : ""
      }`}
      onClick={() => onClick(_id)} // Handle button click and pass the developer's ID to the parent component
      style={{
        border: "1px solid #ddd", // Light border for the button
        borderRadius: "8px", // Rounded corners
        textAlign: "left", // Left-aligned content
        padding: "10px", // Inner padding
      }}
    >
      <Row className="align-items-center w-100">
        {/* Profile Image Section */}
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

        {/* Name and Bio Section */}
        <Col xs={9}>
          <div>
            <strong>
              {/* Display the developer's full name */}
              {firstName} {lastName}
            </strong>
          </div>
          <div style={{ fontSize: "0.8rem", color: "#555" }}>
            {/* Truncate the bio if it exceeds 60 characters */}
            {bio.length > 60 ? `${bio.substring(0, 60)}...` : bio}
          </div>
        </Col>
      </Row>
    </Button>
  );
};

export default DeveloperButton;
