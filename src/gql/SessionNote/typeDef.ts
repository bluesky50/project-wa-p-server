
export const typeDefs: string = `
type SessionNote {
updatedAt: String
sessionId: String
creator: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
sessionNotes: [SessionNote!]!
sessionNote(id: String!): SessionNote!
`;

export const mutations: string = `
createSessionNote(updatedAt: String, sessionId: String, creator: String, title: String, description: String, type: String, category: String, tags: [String]): SessionNote
`;
