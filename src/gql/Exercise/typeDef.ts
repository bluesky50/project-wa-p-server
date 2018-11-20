
export const typeDefs: string = `
type Exercise {
	id: String
	updatedAt: String
	creator: String
	title: String
	description: String
	type: String
	category: String
	tags: [String]
}
`;

export const queries: string = `
exercises: [Exercise!]!
exercise(id: String!): Exercise!
`;

export const mutations: string = `
createExercise(title: String, description: String, type: String, category: String, tags: [String]): Exercise
`;
