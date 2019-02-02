
export const typeDefs: string = `
type SessionInvite {
	id: String
	updatedAt: String
	creator: UserProfileData
	destination: UserProfileData
	sessionId: String
	title: String
	description: String
	type: String
	category: String
	tags: [String]
}
`;

export const queries: string = `
sessionInvites: [SessionInvite!]!
sessionInvite(id: String!): SessionInvite!
receivedInvites: [SessionInvite!]
sentInvites: [SessionInvite!]
`;

// createSessionInvite(destination: String!, sessionId: String!, title: String, description: String, type: String, category: String, tags: [String]): SessionInvite
export const mutations: string = `
createSessionInvite(destination: String!, sessionId: String!, title: String!, description: String!): SessionInvite
`;
