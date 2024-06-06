import { gql } from '@apollo/client';

export const ORDER_COFFEE_DOCUMENT = gql`
    mutation($coffee: CoffeeInputType!) {
        orderCoffee(coffee: $coffee) {
            description
            id
            title
            image
            ingredients
        }
    }
`

export const CUSTOMIZE_COFFEE_DOCUMENT = gql`
    mutation($coffee: CoffeeInputType!) {
        customizeCoffee(coffee: $coffee) {
            id
            title
            description
            image
            ingredients
        }
    }
`