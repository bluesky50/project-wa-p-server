interface IProjectFeature {
	updatedAt?: string;
	projectId?: string;
	creator?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default IProjectFeature;

