
export const typeDefs: string = `
type User {
	username: String
	email: String
	userProfileData: UserProfileData
	userWorkData: UserWorkData
}
`;

export const queries: string = `
users: [User!]!
user(id: String!): User!
`;

export const mutations: string = `
createUser(updatedAt: String, username: String, email: String, password: String): User
`;
