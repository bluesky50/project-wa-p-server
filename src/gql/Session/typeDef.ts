
export const typeDefs: string = `
type Session {
updatedAt: String
creator: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
sessions: [Session!]!
session(id: String!): Session!
`;

export const mutations: string = `
createSession(updatedAt: String, creator: String, title: String, description: String, type: String, category: String, tags: [String]): Session
`;
