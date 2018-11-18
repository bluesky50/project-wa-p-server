
export const typeDefs: string = `
type SessionEvent {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
sessionEvents: [SessionEvent!]!
sessionEvent(id: String!): SessionEvent!
`;

export const mutations: string = `
createsessionEvent(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): SessionEvent
`;
