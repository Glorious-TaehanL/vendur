import gql from 'graphql-tag';

export const GET_FULFILLMENT = gql`
    query GetFulfillmentByOrder($id: ID!){
        order(id:$id){
            fulfillments{
                method
                trackingCode
            }
        }
    }
`;