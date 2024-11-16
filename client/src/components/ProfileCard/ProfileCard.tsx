// Renders the details of the developer data from the parent component
// The parent component will fetch the developer data using the GraphQL query and pass it as props to this component

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProfileCard.css';

interface DeveloperProps {
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

const ProfileCard: React.FC<DeveloperProps> = ({ developer }) => {
    return (
        <Card className="profile-card">
            {/* <Card.Img variant="top" src={developer.imageUrl || '/path/to/default-image.jpg'} /> */}
            <Card.Body>
                <Card.Title>{developer.firstName} {developer.lastName}</Card.Title>
                <Card.Text>Location: {developer.city}, {developer.state}</Card.Text>
                <Card.Text>Hourly Rate: ${developer.hourlyRate}</Card.Text>
                <Card.Text>Telephone: {formatPhoneNumber(developer.telephone)}</Card.Text>
                <Card.Text>Email: {developer.email}</Card.Text>
                <Card.Text>
                    Portfolio: {developer.portfolioLink ? (
                    <Card.Link href={developer.portfolioLink} target="_blank">View Portfolio</Card.Link>
                ) : 'N/A'}
                </Card.Text>
                <Card.Text>
                    GitHub: {developer.githubLink ? (
                        <Card.Link href={developer.githubLink} target="_blank">View GitHub</Card.Link>
                    ) : 'N/A'}
                </Card.Text>
                <Card.Text>Bio: {developer.bio}</Card.Text>
                {/* Add link to contact page here if needed and remove telephone and email */}
                <Button variant="primary" href={`mailto:${developer.email}`}>Contact</Button>
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;