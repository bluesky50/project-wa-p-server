
export const typeDefs: string = `
type Project {
	id: String
	updatedAt: String
	repoUrl: String
	creator: String
	title: String
	description: String
	features: [String]
	type: String
	category: String
	tags: [String]
}
`;

export const queries: string = `
projects: [Project!]!
project(id: String!): Project!
`;

export const mutations: string = `
createProject(repoUrl: String, title: String, description: String, type: String, category: String, tags: [String]): Project
`;
