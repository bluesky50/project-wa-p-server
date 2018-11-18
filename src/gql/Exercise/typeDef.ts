
export const typeDefs: string = `
type Exercise {
	updatedAt: String
	creator: String
	title: String
	description: String
	type: String
	category: String
	tags: [String]
	requirements: [String]
}
`;

export const queries: string = `
exercises: [Exercise!]!
exercise(id: String!): Exercise!
`;

export const mutations: string = `
createExercise(updatedAt: String, creator: String, title: String, description: String, type: String, category: String, tags: [String], requirements: [String]): Exercise
`;
