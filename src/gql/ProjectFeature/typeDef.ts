
export const typeDefs: string = `
type ProjectFeature {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
projectFeatures: [ProjectFeature!]!
projectFeature(id: String!): ProjectFeature!
`;

export const mutations: string = `
createprojectFeature(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): ProjectFeature
`;
