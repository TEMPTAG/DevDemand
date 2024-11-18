import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profileInput: ProfileInput!) {
        updateProfile(profileInput: $profileInput) {
            success
            message
        }
    }
`;