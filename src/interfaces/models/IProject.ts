interface IProject {
	updatedAt?: string;
	creator?: string;
	title?: string;
	description?: string;
	features?: Array<string>;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default IProject;

