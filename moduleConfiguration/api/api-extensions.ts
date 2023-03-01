import gql from 'graphql-tag';

export const adminSchemaExtension = gql`
  type ModuleConfiguration {
    name: String!
    status: Boolean!
  }
  extend type Query {
    getModule(id: ID!): ModuleConfiguration
    getAllModules: [ModuleConfiguration]
  }

  extend type Mutation {
    addModule(name: String, status: Boolean): ModuleConfiguration
    updateModule(name: [String!]!, status: [Boolean!]!): Boolean!
  }
`;

export const shopSchemaExtension = gql`
  type ModuleConfiguration {
    name: String!
    status: Boolean!
  }
  extend type Query {
    getModule(id: ID!): ModuleConfiguration
    getAllModules: [ModuleConfiguration]
  }
`;