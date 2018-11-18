
export const typeDefs: string = `
type User {
updatedAt: String
username: String
email: String
userProfileData: String
userWorkData: String
}
`;

export const queries: string = `
users: [User!]!
user(id: String!): User!
`;

export const mutations: string = `
createUser(updatedAt: String, username: String, email: String, password: String, authToken: String, refreshToken: String, userProfileData: String, userWorkData: String): User
`;
