import IUserWorkData from '../../interfaces/models/IUserWorkData';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const UserWorkDatasResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IUserWorkData> => {
	return await context.models.UserWorkData.find();
};

const UserWorkDataResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IUserWorkData> => {
	return await context.models.UserWorkData.findById(args.id);
};

const createUserWorkDataResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IUserWorkData, context: IResolverContext): Promise<IUserWorkData> => {
		const newUserWorkData = await new context.models.UserWorkData({
			userId: args.userId,
			followedProjects: args.followedProjects,
			followedSessions: args.followedSessions,
			followedExercises: args.followedExercises
		}).save();

		if (newUserWorkData) {
			return newUserWorkData;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		userWorkDatas: UserWorkDatasResolver,
		userWorkData: UserWorkDataResolver
	},
	Mutation: {
		createUserWorkData: createUserWorkDataResolver
	}
}

export default resolvers;

