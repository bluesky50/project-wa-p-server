import IUserProfileData from '../../interfaces/models/IUserProfileData';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const UserProfileDatasResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IUserProfileData> => {
	return await context.models.UserProfileData.find();
};

const UserProfileDataResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IUserProfileData> => {
	return await context.models.UserProfileData.findById(args.id);
};

const createUserProfileDataResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IUserProfileData, context: IResolverContext): Promise<IUserProfileData> => {
		const newUserProfileData = await new context.models.UserProfileData({
			userId: args.userId,
			about: args.about,
			status: args.status,
			additional: args.additional
		}).save();

		if (newUserProfileData) {
			return newUserProfileData;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		userProfileDatas: UserProfileDatasResolver,
		userProfileData: UserProfileDataResolver
	},
	Mutation: {
		createUserProfileData: createUserProfileDataResolver
	}
}

export default resolvers;

