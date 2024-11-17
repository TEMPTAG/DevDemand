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

const ProfileCard: React.FC<DeveloperProps> = ({ isLoading, developer }) => {
    return (
            <Card className="profile-card mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Img variant="top" src={developer.imageUrl || "/assets/images/profile-placeholder.png" }/>
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
                        </>
                    ) : (
                        <>
                            <Card.Title className="text-center pb-3 fs-2">{developer.firstName} {developer.lastName}</Card.Title>

                            <Card.Text className="d-flex flex-column align-items-center ">
                            <Card.Text className="d-flex flex-column align-items-start ">
                                <Card.Text className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-3" /> {developer.city}, {developer.state}
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaDollarSign className="me-3" /> {developer.hourlyRate} p/h
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaPhone style={{ transform: 'scaleX(-1)' }} className="me-3" /> {formatPhoneNumber(developer.telephone ?? '')}
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaEnvelope className="me-3" /> {developer.email}
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaExternalLinkAlt className="me-3" />{' '}
                                    {developer.portfolioLink ? (
                                        <Card.Link href={developer.portfolioLink} target="_blank" className="text-decoration-none">View Portfolio</Card.Link>
                                    ) : 'Portfolio not provided'}
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaGithub className="me-3" />{' '}
                                    {developer.githubLink ? (
                                        <Card.Link href={developer.githubLink} target="_blank" className="text-decoration-none">View GitHub</Card.Link>
                                    ) : 'GitHub not provided'}
                                </Card.Text>
                            </Card.Text>
                            </Card.Text>

                            <Card.Text className="text-justify">{developer.bio}</Card.Text>
                            <div className="text-center mt-3">
                                <Button variant="primary" href={`mailto:${developer.email}`}>Contact {developer.firstName}</Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
    );
}

export default ProfileCard;