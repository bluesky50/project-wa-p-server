
export const typeDefs: string = `
type UserWorkData {
	userId: String
	followedProjects: [String]
	followedSessions: [String]
	followedExercises: [String]
}
`;

export const queries: string = `
userWorkDatas: [UserWorkData!]!
userWorkData(id: String!): UserWorkData!
`;

export const mutations: string = `
createUserWorkData(userId: String!, followedProjects: [String], followedSessions: [String], followedExercises: [String]): UserWorkData
`;
