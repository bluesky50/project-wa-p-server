interface IExercise {
	updatedAt?: string;
	creator?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
	requirements?: Array<string>;
}

export default IExercise;

