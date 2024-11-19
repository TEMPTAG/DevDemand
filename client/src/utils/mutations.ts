import { gql } from '@apollo/client';

export const UPDATE_DEV = gql`
    mutation updateDev($profileInput: ProfileInput!) {
        updateProfile(profileInput: $profileInput) {
            success
            message
        }
    }
`;

export const DELETE_DEV = gql`
    mutation deleteDev {
        deleteDev
    }
`;