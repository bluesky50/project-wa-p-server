import ISession from '../../interfaces/models/ISession';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const SessionsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISession> => {
	return await context.models.Session.find();
};

const SessionResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISession> => {
	return await context.models.Session.findById(args.id);
};

const createSessionResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISession, context: IResolverContext): Promise<ISession> => {
		const newSession = await new context.models.Session({
			updatedAt: "today",
			creator: context.state.user.id,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newSession) {
			return newSession;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		sessions: SessionsResolver,
		session: SessionResolver
	},
	Mutation: {
		createSession: createSessionResolver
	}
}

export default resolvers;

