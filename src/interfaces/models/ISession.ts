interface ISession {
	updatedAt?: string;
	creator?: string;
	title?: string;
	participants?: Array<any>;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default ISession;

