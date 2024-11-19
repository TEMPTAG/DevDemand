import { gql } from '@apollo/client';

export const GET_DEV = gql`
    query getDev {
        profile {
            _id
            firstName
            lastName
            telephone
            email
            city
            state
            portfolioLink
            githubLink
            hourlyRate
            bio
        }
    }
`;