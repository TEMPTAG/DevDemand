import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import DeveloperCard, { DeveloperCardProps } from "../components/DeveloperCard";
import DeveloperButton from "../components/DeveloperButton";

const Logo = "/assets/logos/DEVDemandLogo.svg";
const RoundLogo = "/assets/logos/DDRoundLogo.svg";

const initialDevelopers = [
  {
    id: 1,
    imageUrl: "https://quiet-cheesecake-8e0b20.netlify.app/assets/pfp.jpeg",
    firstName: "Axel",
    lastName: "Paxton",
    telephone: "(888) 888-8888",
    email: "axep504@gmail.com",
    city: "Springville",
    state: "UT",
    portfolioLink: "https://quiet-cheesecake-8e0b20.netlify.app/",
    githubLink: "https://github.com/Axe-P",
    hourlyRate: 150,
    bio: "Hello! I’m Axel, a passionate full-stack developer. My journey in web development began with HTML and CSS, and since then, I've expanded my skill set to include JavaScript, TypeScript, SQL, and React. I also have experience with APIs and Node.js, which enhance my ability to build and integrate robust web applications.",
  },
  {
    id: 2,
    imageUrl: "https://avatars.githubusercontent.com/u/170969819?v=4",
    firstName: "Ian",
    lastName: "Ferguson",
    telephone: "(480) 266-5233",
    email: "iansterlingferguson@gmail.com",
    city: "Mesa",
    state: "AZ",
    portfolioLink: "https://github.com/TEMPTAG/Portfolio",
    githubLink: "https://github.com/TEMPTAG",
    hourlyRate: 150,
    bio: "Full-stack developer with 20+ years in automotive and medical industries, focused on building efficient, user-centered web applications.",
  },
  {
    id: 3,
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQFJNiPjTbe5rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723669954062?e=1737590400&v=beta&t=kwW3p4-yjgwjaWbCaILzxA0Li5WDfcyTGpNdRuh5I4o",
    firstName: "Keith",
    lastName: "Williams",
    telephone: "(888) 777-7777",
    email: "keith.amadeus.williams@gmail.com",
    city: "Idaho Falls",
    state: "ID",
    portfolioLink: "https://comingsoon.com",
    githubLink: "https://github.com/keithamadeus",
    hourlyRate: 150,
    bio: "I am a passionate and hard working Engineer and Leader. I have a thirst for learning new technology and finding creative ways to solve problems. I love building beautiful and reusable code. I thrive working with a team to achieve success together. I have excellent interpersonal communication and organization skills.",
  },
  {
    id: 4,
    imageUrl: "https://avatars.githubusercontent.com/u/170678508?v=4",
    firstName: "Rory",
    lastName: "Dowse",
    telephone: "4803360379",
    email: "rorydowse@hotmail.com",
    city: "Phoenix",
    state: "AZ",
    portfolioLink: "https://rory-dowse-portfolio.netlify.app/",
    githubLink: "https://github.com/rorydowse",
    hourlyRate: 150,
    bio: "Software Engineer specializing in the MERN stack, with a creative background as a professional pianist and over 8 years of web development experience.",
  },
];

const shuffleArray = (array: typeof initialDevelopers) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => {
      const { sort, ...rest } = item;
      return rest;
    });
};

const Dashboard = () => {
  const [error, _setError] = useState(false);
  const [developers, setDevelopers] = useState(initialDevelopers);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );

  useEffect(() => {
    setDevelopers(shuffleArray(initialDevelopers));
  }, []);

  if (error) {
    return <ErrorPage />;
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
                    key={dev.id}
                    id={dev.id}
                    imageUrl={dev.imageUrl}
                    firstName={dev.firstName}
                    lastName={dev.lastName}
                    bio={dev.bio}
                    onClick={() => setSelectedDeveloper(dev.firstName)}
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
                (dev) => dev.firstName === selectedDeveloper
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
