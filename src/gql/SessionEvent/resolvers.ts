import ISessionEvent from '../../interfaces/models/ISessionEvent';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const SessionEventsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISessionEvent> => {
	return await context.models.SessionEvent.find();
};

const SessionEventResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISessionEvent> => {
	return await context.models.SessionEvent.findById(args.id);
};

const createSessionEventResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISessionEvent, context: IResolverContext): Promise<ISessionEvent> => {
		const newSessionEvent = await new context.models.SessionEvent({
			updatedAt: "today",
			sessionId: args.sessionId,
			userId: args.userId,
			startTime: args.startTime,
			endTime: args.endTime,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newSessionEvent) {
			return newSessionEvent;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		sessionEvents: SessionEventsResolver,
		sessionEvent: SessionEventResolver
	},
	Mutation: {
		createSessionEvent: createSessionEventResolver
	}
}

export default resolvers;

