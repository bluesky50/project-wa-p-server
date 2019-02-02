import ISession from '../../interfaces/models/ISession';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const SessionsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISession> => {
	return await context.models.Session.find()
		.populate({
			path: 'project',
			select: 'title description'
		})
		.populate({
			path: 'participants',
			select: 'username'
		})
		.exec();
};

const SessionResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISession> => {
	return await context.models.Session.findById(args.id)
		.populate({
			path: 'project',
			select: 'title description'
		})
		.populate({
			path: 'participants',
			select: 'username'
		})
		.exec();
};

const createSessionResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISession, context: IResolverContext): Promise<ISession> => {
		const userId = context.state.user.id;
		const newSession = await new context.models.Session({
			updatedAt: "today",
			access: args.access,
			visibility: args.visibility,
			creator: userId,
			project: args.projectId,
			title: args.title,
			participants: [userId],
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

