interface IFeedback {
	updatedAt?: string;
	creator?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
	votes?: Array<string>;
}

export default IFeedback;

