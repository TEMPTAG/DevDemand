import { Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// ErrorPage component
// This component is displayed when a user navigates to a non-existent page (404 error).
const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center mt-5">
      {/* Alert box for the main content */}
      <Alert variant="light" className="p-4 rounded shadow">
        {/* Display the main error message */}
        <h1 className="display-4 mb-3">404: Page Not Found</h1>

        {/* Secondary error message with a friendly tone */}
        <p className="lead mb-4">
          These aren't the Droids you're looking for...
        </p>

        {/* Fun visual element */}
        <h1 className="fs-1 mb-4">¯\_(ツ)_/¯</h1>

        {/* Link to redirect users back to the home page */}
        <Link to="/" className="btn custom-btn">
          Go Back Home
        </Link>
      </Alert>
    </Container>
  );
};

export default ErrorPage;
