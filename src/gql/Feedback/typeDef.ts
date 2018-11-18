
export const typeDefs: string = `
type Feedback {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
feedbacks: [Feedback!]!
feedback(id: String!): Feedback!
`;

export const mutations: string = `
createfeedback(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): Feedback
`;
