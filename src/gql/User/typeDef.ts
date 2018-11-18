
export const typeDefs: string = `
type User {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
users: [User!]!
user(id: String!): User!
`;

export const mutations: string = `
createuser(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): User
`;
