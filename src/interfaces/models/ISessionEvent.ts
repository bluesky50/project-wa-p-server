interface ISessionEvent {
	updatedAt?: string;
	sessionId?: string;
	userId?: string;
	startTime?: string;
	endTime?: string;
	title?: string;
	description?: string;
	type?: string;
	category?: string;
	tags?: Array<string>;
}

export default ISessionEvent;

