import { Container, Row, Col } from "react-bootstrap";
import { FaCircleHalfStroke } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer bg-primary text-white-50 py-3">
      <Container fluid>
        <Row className="align-items-center">
          {/* Centered Text */}
          <Col className="d-flex justify-content-center">
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
            <FaCircleHalfStroke
              className="me-3"
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => {
                console.log("Toggle dark mode");
              }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
