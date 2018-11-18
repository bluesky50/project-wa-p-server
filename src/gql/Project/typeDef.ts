
export const typeDefs: string = `
type Project {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
projects: [Project!]!
project(id: String!): Project!
`;

export const mutations: string = `
createproject(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): Project
`;
