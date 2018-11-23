import IUser from '../../interfaces/models/IUser';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const UsersResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<IUser> => {

		// const pdata = await context.models.UserProfileData.find();
		// console.log("Pdata", pdata);
		
		// const wdata = await context.models.UserWorkData.find();
		// console.log("Wdata", wdata);

		// const udata = await context.models.User.find()
		// 	.populate({ 
		// 		path: 'userProfileData',
		// 		select: 'about additional status userAlias',
		// 	})
		// 	.populate({
		// 		path: 'userWorkData',
		// 		select: 'userId followedProjects followedSessions followedExercises',
		// 	});
		// console.log("Udata", udata);

		return await context.models.User.find()
			.populate({ 
				path: 'userProfileData',
				select: 'about additional status userAlias',
			})
			.populate({
				path: 'userWorkData',
				select: 'userId followedProjects followedSessions followedExercises',
			})
			.select('-password -authToken -refreshToken')
			.exec();
	}
)

const UserResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: { id: string }, context: IResolverContext): Promise<IUser> => {
		return await context.models.User.findById(args.id).select('-password -authToken -refreshToken');
	}
)

const createUserResolver = isAuthenticatedResolver.createResolver(
	// async (parent: any, args: IUser, context: IResolverContext): Promise<IUser> => {
	// 	const newUser = await new context.models.User({
	// 		updatedAt: 'today',
	// 		username: args.username,
	// 		email: args.email,
	// 		password: args.password
	// 	}).save();

	// 	if (newUser) {
	// 		return await newUser.generateTokens();
	// 	} else {
	// 		return await Promise.reject();
	// 	}
	// }
)

const resolvers: IResolverMap = {
	Query: {
		users: UsersResolver,
		user: UserResolver
	},
	Mutation: {
		createUser: createUserResolver
	}
}

export default resolvers;

