
export const typeDefs: string = `
type SessionInvite {
updatedAt: String
creator: String
destination: String
sessionId: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
sessionInvites: [SessionInvite!]!
sessionInvite(id: String!): SessionInvite!
`;

export const mutations: string = `
createSessionInvite(updatedAt: String, creator: String, destination: String, sessionId: String, title: String, description: String, type: String, category: String, tags: [String]): SessionInvite
`;
