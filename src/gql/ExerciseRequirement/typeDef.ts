
export const typeDefs: string = `
type ExerciseRequirement {
	id: String
	updatedAt: String
	creator: String
	exerciseId: String
	title: String
	description: String
	type: String
	category: String
	tags: [String]
}
`;

export const queries: string = `
exerciseRequirements: [ExerciseRequirement!]!
exerciseRequirement(id: String!): ExerciseRequirement!
`;

export const mutations: string = `
createExerciseRequirement(exerciseId: String, title: String, description: String, type: String, category: String, tags: [String]): ExerciseRequirement
`;
