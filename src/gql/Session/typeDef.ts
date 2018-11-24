
export const typeDefs: string = `
type Session {
	id: String
	project: Project
	visibility: String
	access: String
	updatedAt: String
	creator: String
	title: String
	participants: [User!]
	description: String
	type: String
	category: String
	tags: [String]
}
`;

export const queries: string = `
sessions: [Session!]!
session(id: String!): Session!
`;

export const mutations: string = `
createSession(access: String, visibility: String, title: String, description: String, type: String, category: String, tags: [String]): Session
`;
