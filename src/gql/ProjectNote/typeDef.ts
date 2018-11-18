
export const typeDefs: string = `
type ProjectNote {
updatedAt: String
creator: String
projectId: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
projectNotes: [ProjectNote!]!
projectNote(id: String!): ProjectNote!
`;

export const mutations: string = `
createProjectNote(updatedAt: String, creator: String, projectId: String, title: String, description: String, type: String, category: String, tags: [String]): ProjectNote
`;
