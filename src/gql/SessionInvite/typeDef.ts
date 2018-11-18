
export const typeDefs: string = `
type SessionInvite {
updatedAt: String
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
createsessionInvite(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): SessionInvite
`;
