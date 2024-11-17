// Renders the details of the developer data from the parent component
// The parent component will fetch the developer data using the GraphQL query and pass it as props to this component

import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import './ProfileCard.css';

interface DeveloperProps {
    isLoading: boolean;
    developer: {
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

const formatPhoneNumber = (number: string) => {
    const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedNumber;
};

const ProfileCard: React.FC<DeveloperProps> = ({ isLoading, developer }) => {
    return (
        <Card className="profile-card">
            {/* <Card.Img variant="top" src={developer.imageUrl || '/path/to/default-image.jpg'} /> */}
            <Card.Body>
                {isLoading ? (
                    <>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={6} animation="glow" />
                    </>
                ) : (
                    <>
                        <Card.Title>{developer.firstName} {developer.lastName}</Card.Title>
                        <Card.Text>Location: {developer.city}, {developer.state}</Card.Text>
                        <Card.Text>Hourly Rate: ${developer.hourlyRate}</Card.Text>
                        <Card.Text>Telephone: {formatPhoneNumber(developer.telephone)}</Card.Text>
                        <Card.Text>Email: {developer.email}</Card.Text>
                        <Card.Text>
                            Portfolio: {developer.portfolioLink ? (
                            <Card.Link href={developer.portfolioLink} target="_blank">View Portfolio</Card.Link>
                        ) : 'Portfolio not provided'}
                        </Card.Text>
                        <Card.Text>
                            GitHub: {developer.githubLink ? (
                                <Card.Link href={developer.githubLink} target="_blank">View GitHub</Card.Link>
                            ) : 'GitHub not provided'}
                        </Card.Text>
                        <Card.Text>Bio: {developer.bio}</Card.Text>
                        {/* Add link to contact page here if needed and remove telephone and email */}
                        <Button variant="primary" href={`mailto:${developer.email}`}>Contact</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;