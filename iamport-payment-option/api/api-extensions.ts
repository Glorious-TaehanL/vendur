import gql from 'graphql-tag';

export const schemaExtension = gql`
    type PGData{
        paymentStoreName: String!
        paymentpgOption: String!
        paymentUserCode: String!
    }

    extend type Query{
        getPaymentOption(option: Boolean!): PGData!
    }

`;