interface ISessionInvite {
	updatedAt?: string;
	creator?: string;
	destination?: string;
	sessionId?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default ISessionInvite;

