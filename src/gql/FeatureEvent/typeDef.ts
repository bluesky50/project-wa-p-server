
export const typeDefs: string = `
type FeatureEvent {
updatedAt: String
feature: String
session: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
featureEvents: [FeatureEvent!]!
featureEvent(id: String!): FeatureEvent!
`;

export const mutations: string = `
createFeatureEvent(updatedAt: String, feature: String, session: String, title: String, description: String, type: String, category: String, tags: [String]): FeatureEvent
`;
