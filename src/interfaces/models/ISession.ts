interface ISession {
	updatedAt?: string;
	creator?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default ISession;

