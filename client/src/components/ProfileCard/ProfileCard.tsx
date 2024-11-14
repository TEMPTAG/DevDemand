// Renders the details of the developer data from the parent component
// The parent component will fetch the developer data using the GraphQL query and pass it as props to this component

import React from 'react';
import './ProfileCard.css';

interface DeveloperProps {
    developer: {
        firstName: string;
        lastName: string;
        location: string;
        hourlyRate: number;
        skillset: string[];
        bio: string;
    };
}

const ProfileCard: React.FC<DeveloperProps> = ({ developer }) => {
    return (
        <div className="profile-card">
            <h3>{developer.firstName} {developer.lastName}</h3>
            <p>Location: {developer.location}</p>
            <p>Hourly Rate: ${developer.hourlyRate}</p>
            <p>Skillset: {developer.skillset.join(', ')}</p>
            <p>Bio: {developer.bio}</p>
            {/* Add contact button here if needed */}
        </div>
    );
};

export default ProfileCard;