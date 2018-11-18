
export const typeDefs: string = `
type UserWorkData {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
userWorkDatas: [UserWorkData!]!
userWorkData(id: String!): UserWorkData!
`;

export const mutations: string = `
createuserWorkData(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): UserWorkData
`;
