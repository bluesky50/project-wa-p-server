
export const typeDefs: string = `
type UserProfileData {
updatedAt: String
title: String
description: String
type: String
category: String
tags: [String]
}
`;

export const queries: string = `
userProfileDatas: [UserProfileData!]!
userProfileData(id: String!): UserProfileData!
`;

export const mutations: string = `
createuserProfileData(updatedAt: String, title: String, description: String, type: String, category: String, tags: [String]): UserProfileData
`;
