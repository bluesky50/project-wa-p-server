
export const typeDefs: string = `
type UserProfileData {
	userId: String
	userAlias: String
	about: String
	status: String
	additional: String
}
`;

export const queries: string = `
userProfileDatas: [UserProfileData!]!
userProfileData(id: String!): UserProfileData!
`;

export const mutations: string = `
createUserProfileData(userId: String, userAlias: String, about: String, status: String, additional: String): UserProfileData
`;
