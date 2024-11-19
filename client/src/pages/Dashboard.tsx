import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_DEVELOPERS } from "../utils/queries";
import ErrorPage from "./ErrorPage";
import DeveloperCard, { DeveloperCardProps } from "../components/DeveloperCard";
import DeveloperButton from "../components/DeveloperButton";

const Logo = "/assets/logos/DEVDemandLogo.svg";
const RoundLogo = "/assets/logos/DDRoundLogo.svg";

const shuffleArray = (array: DeveloperCardProps[]) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...rest }) => rest);
};

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_DEVELOPERS);
  const [developers, setDevelopers] = useState<DeveloperCardProps[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (data?.developers) {
      const validDevelopers = data.developers.filter(
        (dev: DeveloperCardProps) =>
          dev.firstName && dev.lastName && dev.email && dev.bio
      );
      setDevelopers(shuffleArray(validDevelopers));
    }
  }, [data]);

  if (error) {
    console.error("Error fetching developers:", error);
    return <ErrorPage />;
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading developers...</p>
      </div>
    );
  }

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
        <Col xs={12} lg={4} className="mb-3">
          <Card className="shadow border rounded">
            <Card.Body>
              <Card.Title>
                <strong>Browse our Developers:</strong>
              </Card.Title>
              <div className="d-flex flex-column">
                {developers.map((dev) => (
                  <DeveloperButton
                    key={dev._id}
                    _id={dev._id}
                    imageUrl={dev.imageUrl}
                    firstName={dev.firstName}
                    lastName={dev.lastName}
                    bio={dev.bio}
                    onClick={(id) => setSelectedDeveloper(id)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col
          xs={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {selectedDeveloper ? (
            <DeveloperCard
              {...(developers.find(
                (dev) => dev._id === selectedDeveloper
              ) as DeveloperCardProps)}
            />
          ) : (
            <Card className="border-0 text-center">
              <Card.Body>
                <Card.Img
                  src={RoundLogo}
                  alt="Round DevDemand Logo"
                  style={{ height: "400px" }}
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
