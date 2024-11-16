// Renders the details of the developer data from the parent component
// The parent component will fetch the developer data using the GraphQL query and pass it as props to this component

import React from 'react';
import './ProfileCard.css';

interface DeveloperProps {
    developer: {
        firstName?: string;
        lastName?: string;
        telephone?: string;
        email?: string;
        city?: string;
        state?: string;
        portfolioLink?: string;
        githubLink?: string;
        hourlyRate?: number;
        bio?: string;
    };
}

const ProfileCard: React.FC<DeveloperProps> = ({ developer }) => {
    return (
        <div className="profile-card">
            <h3>{developer.firstName} {developer.lastName}</h3>
            <p>Location: {developer.city}, {developer.state}</p>
            <p>Hourly Rate: ${developer.hourlyRate}</p>
            <p>Telephone: {developer.telephone}</p>
            <p>Email: {developer.email}</p>
            <p>Portfolio: {developer.portfolioLink}</p>
            <p>GitHub: {developer.githubLink}</p>
            <p>Bio: {developer.bio}</p>
            {/* Add contact button here if needed and remove telephone and email */}
        </div>
    );
};

export default ProfileCard;