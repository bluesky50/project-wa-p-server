
export const typeDefs: string = `
type Session {
updatedAt: String
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
createsession(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): Session
`;
