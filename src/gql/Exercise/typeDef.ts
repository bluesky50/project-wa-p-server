
export const typeDefs: string = `
type Exercise {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
exercises: [Exercise!]!
exercise(id: String!): Exercise!
`;

export const mutations: string = `
createexercise(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): Exercise
`;
