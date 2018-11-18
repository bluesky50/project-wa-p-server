interface IProjectNote {
	updatedAt?: string;
	creator?: string;
	projectId?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default IProjectNote;

