interface IFeatureEvent {
	updatedAt?: string;
	feature?: string;
	session?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default IFeatureEvent;

