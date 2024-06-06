import { gql } from '@apollo/client';

export const ORDER_COFFEE_DOCUMENT = gql`
    mutation($coffee: CoffeeInputType!) {
        orderCoffee(coffee: $coffee) {
            id
            name
        }
    }
`
