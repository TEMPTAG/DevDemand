// Renders the details of the developer data from the parent component
// The parent component will fetch the developer data using the GraphQL query and pass it as props to this component

import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import { FaMapMarkerAlt, FaDollarSign, FaPhone, FaEnvelope, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProfileCard.css';

interface DeveloperProps {
    isLoading: boolean;
    developer: {
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

const formatPhoneNumber = (number: string) => {
    const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedNumber;
};

const ProfileCard: React.FC<DeveloperProps> = ({ isLoading = true, developer = {} }) => {
    return (
        <div className="d-flex justify-content-center">
            <Card className="profile-card" style={{ maxWidth: '400px' }}>
            <Card.Img variant="top" src={developer.imageUrl || "/assets/images/profile-placeholder.png" }/>
                <Card.Body className="text-center">
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
                        </>
                    ) : (
                        <>
                            <Card.Title>{developer.firstName} {developer.lastName}</Card.Title>
                            <Card.Text>
                                <FaMapMarkerAlt /> {developer.city}, {developer.state}
                                </Card.Text>
                            <Card.Text> 
                                <FaDollarSign /> {developer.hourlyRate} p/h</Card.Text>
                            <Card.Text>
                            <FaPhone style={{ transform: 'scaleX(-1)' }} /> {formatPhoneNumber(developer.telephone ?? '')}
                                </Card.Text>
                            <Card.Text>
                                <FaEnvelope /> {developer.email}
                                </Card.Text>
                            <Card.Text>
                                <FaExternalLinkAlt />{' '} 
                                {developer.portfolioLink ? (
                                <Card.Link href={developer.portfolioLink} target="_blank">View Portfolio</Card.Link>
                            ) : 'Portfolio not provided'}
                            </Card.Text>
                            <Card.Text>
                                <FaGithub />{' '}
                                    {developer.githubLink ? (
                                    <Card.Link href={developer.githubLink} target="_blank">View GitHub</Card.Link>
                                ) : 'GitHub not provided'}
                            </Card.Text>
                            <Card.Text>{developer.bio}</Card.Text>
                            {/* Add link to contact page here if needed and remove telephone and email */}
                            <Button variant="primary" href={`mailto:${developer.email}`}>Contact</Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProfileCard;