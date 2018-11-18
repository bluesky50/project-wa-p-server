
export const typeDefs: string = `
type SessionEvent {
updatedAt: String
sessionId: String
userId: String
startTime: String
endTime: String
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
createSessionEvent(updatedAt: String, sessionId: String, userId: String, startTime: String, endTime: String, title: String, description: String, type: String, category: String, tags: [String]): SessionEvent
`;
