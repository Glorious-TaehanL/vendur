import gql from "graphql-tag";
import {
  ID
} from "@vendure/core";
import {
  RecommendationType,
} from "../entities/product-recommendation.entity";

export type ProductRecommendationInput = {
  product: ID;
  recommendation: ID;
  type: RecommendationType;
};

export const adminSchemaExtension = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
  }
  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }
  extend type Mutation {
    updateCrossSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
    updateUpSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
  }
  extend type Product {
    recommendations: [ProductRecommendation!]!
  }
`;

export const shopSchemaExtension = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
  }
  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }
  extend type Product {
    recommendations: [ProductRecommendation!]!
  }
`;

