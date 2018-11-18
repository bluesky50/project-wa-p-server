
export const typeDefs: string = `
type ExerciseRequirement {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
exerciseRequirements: [ExerciseRequirement!]!
exerciseRequirement(id: String!): ExerciseRequirement!
`;

export const mutations: string = `
createexerciseRequirement(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): ExerciseRequirement
`;
