interface IExerciseRequirement {
	updatedAt?: string;
	creator?: string;
	exerciseId?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default IExerciseRequirement;

