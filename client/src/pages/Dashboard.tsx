import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_DEVELOPERS } from "../utils/queries";
import ErrorPage from "./ErrorPage";
import DeveloperCard from "../components/DashboardComponents/ProfileCard";
import DeveloperButton from "../components/DashboardComponents/DeveloperButton";

// Paths for logo images
const Logo = "/assets/logos/DEVDemandLogo.svg";
const RoundLogo = "/assets/logos/DDRoundLogo.svg";

// Utility function to shuffle an array randomly
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() })) // Add a random sort key to each item
    .sort((a, b) => a.sort - b.sort) // Sort items based on the random key
    .map(({ sort, ...rest }) => rest); // Remove the sort key
};

// Main Dashboard component
const Dashboard = () => {
  // Apollo Client's useQuery hook to fetch developer data
  const { loading, error, data } = useQuery(GET_DEVELOPERS);

  // State to store the list of developers
  const [developers, setDevelopers] = useState<any[]>([]);

  // State to track the currently selected developer
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );

  // useEffect to process and shuffle developer data once it's fetched
  useEffect(() => {
    if (data?.developers) {
      const validDevelopers = data.developers.filter(
        (dev: any) =>
          dev.firstName &&
          dev.lastName &&
          dev.email &&
          dev.bio &&
          dev.imageUrl &&
          dev.telephone &&
          dev.city &&
          dev.state &&
          dev.portfolioLink &&
          dev.githubLink // Ensure developer data is complete
      );
      setDevelopers(shuffleArray(validDevelopers)); // Shuffle and update the developer list
    }
  }, [data]);

  // Render error page if there is a query error
  if (error) {
    console.error("Error fetching developers:", error);
    return <ErrorPage />;
  }

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading developers...</p>
      </div>
    );
  }

  // Display a message if no developers are available
  if (developers.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No developers available at the moment. Please check back later!</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Developer List Section */}
        <Col xs={12} lg={4} className="mb-3 order-last order-lg-first">
          <Card className="shadow border rounded">
            <Card.Body>
              <Card.Title>
                <strong>Browse our Developers:</strong>
              </Card.Title>
              <div className="d-flex flex-column">
                {/* Render DeveloperButton for each developer */}
                {developers.map((dev) => (
                  <DeveloperButton
                    key={dev._id} // Unique key for each developer
                    _id={dev._id} // Developer's ID
                    imageUrl={dev.imageUrl} // Developer's profile image
                    firstName={dev.firstName} // Developer's first name
                    lastName={dev.lastName} // Developer's last name
                    bio={dev.bio} // Developer's bio
                    onClick={(id) => setSelectedDeveloper(id)} // Set selected developer on click
                    isActive={dev._id === selectedDeveloper} // Highlight if active
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Developer Details Section */}
        <Col
          xs={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {selectedDeveloper ? (
            // Show selected developer's detailed profile
            <DeveloperCard
              isLoading={loading} // Pass loading state
              developer={
                developers.find((dev) => dev._id === selectedDeveloper) || {} // Find developer by ID
              }
            />
          ) : (
            // Default view when no developer is selected
            <Card className="border-0 text-center">
              <Card.Body>
                {/* Display RoundLogo on large screens */}
                <Card.Img
                  src={RoundLogo}
                  alt="Round DevDemand Logo"
                  style={{ height: "400px" }}
                  className="d-none d-lg-block"
                />
                <Card.Title as="h1">
                  Welcome to{" "}
                  <img
                    src={Logo}
                    alt="DevDemand Logo"
                    style={{ height: "80px" }}
                  />
                  ...
                </Card.Title>
                <Card.Text>
                  Your one-stop shop for finding the right talent to take your
                  project from dream to deployed!
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
