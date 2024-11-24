import { Container, Row, Col } from "react-bootstrap"; // Importing React-Bootstrap components
import { FaCircleHalfStroke } from "react-icons/fa6"; // Importing an icon for the theme toggle button

export default function Footer() {
  return (
    <footer className="footer bg-primary text-white-50 py-3">
      {/* Footer section styled with a primary background and light text */}
      <Container fluid>
        {/* Full-width container for footer content */}
        <Row className="align-items-center">
          {/* Centered Text */}
          <Col className="d-flex justify-content-center">
            {/* Footer message with a link to the project README */}
            <h6 className="p-2 m-0 text-center">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/TEMPTAG/DevDemand/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-50 text-decoration-none"
              >
                DevDemand Team
              </a>
              . All Rights Reserved
            </h6>
          </Col>

          {/* Theme Button */}
          <Col xs="auto" className="d-flex justify-content-end">
            {/* Icon button for toggling dark mode */}
            <FaCircleHalfStroke
              className="me-3"
              style={{ fontSize: "24px", cursor: "pointer" }} // Styling for the icon
              onClick={() => {
                console.log("Toggle dark mode"); // Placeholder function for dark mode toggle
              }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
