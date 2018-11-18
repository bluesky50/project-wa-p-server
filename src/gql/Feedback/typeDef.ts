
export const typeDefs: string = `
type Feedback {
updatedAt: String
creator: String
title: String
description: String
type: String
category: String
tags: [String]
votes: [String]
}
`;

export const queries: string = `
feedbacks: [Feedback!]!
feedback(id: String!): Feedback!
`;

export const mutations: string = `
createFeedback(updatedAt: String, creator: String, title: String, description: String, type: String, category: String, tags: [String], votes: [String]): Feedback
`;
