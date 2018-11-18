
export const typeDefs: string = `
type ProjectFeature {
updatedAt: String
projectId: String
creator: String
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
createProjectFeature(updatedAt: String, projectId: String, creator: String, title: String, description: String, type: String, category: String, tags: [String]): ProjectFeature
`;
