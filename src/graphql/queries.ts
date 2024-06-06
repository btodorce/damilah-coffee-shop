import { gql } from '@apollo/client';

export const ALL_HOTS_DOCUMENT = gql`
    query fetchHotCoffeeProducts {
        allHots {
            id
            description
            image
            title
            ingredients
        }
    }
`
