import IUserProfileData from '../../interfaces/models/IUserProfileData';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const UserProfileDatasResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IUserProfileData> => {
	const data = await context.models.UserProfileData.find();
	return data.map((upd: any) => {
		const newObject = upd.toObject();
		newObject.userId = upd.userId.toString();
		return newObject;
	});
};

const UserProfileDataResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IUserProfileData> => {
	return await context.models.UserProfileData.findById(args.id);
};

const createUserProfileDataResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IUserProfileData, context: IResolverContext): Promise<IUserProfileData> => {
		const newUserProfileData = await new context.models.UserProfileData({
			userId: args.userId,
			userAlias: args.userAlias,
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

