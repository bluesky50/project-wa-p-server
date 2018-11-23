import bcrypt from 'bcrypt';
import { LoginError } from '../../lib/errors';
import { isNotAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';
import { IAuthRegisterArgs, IAuthLoginArgs } from '../../interfaces/args/IAuthArgs';
import { IAuthLoginResponse } from '../../interfaces/gql/types/IAuthLoginResponse';
import { IAuthRegisterResponse } from '../../interfaces/gql/types/IAuthRegisterResponse';

const loginResolver = isNotAuthenticatedResolver.createResolver(
	async (parent: any, args: IAuthLoginArgs, context: IResolverContext) => {
		
		const user = await context.models.User.findByUsername(args.username);

		if (!user) {
			throw new LoginError();
		}

		const valid = await bcrypt.compare(args.password, user.password);

		if (!valid) {
			throw new LoginError();
		}

		const userWithTokens = await user.generateTokens();

		const response: IAuthLoginResponse = userWithTokens ? 
			{ success: true, authToken: userWithTokens.authToken, refreshToken: userWithTokens.refreshToken } : 
			{ success: false, authToken: null, refreshToken: null};
		
		return response;
	}
)

const registerResolver = async (parent: any, args: IAuthRegisterArgs, context: IResolverContext) => {
	const newUser = await new context.models.User({
		username: args.username,
		email: args.email,
		password: args.password
	}).save();

	const newUserProfileData = await new context.models.UserProfileData({
		userId: newUser.id,
		userAlias: args.alias,
		about: args.about,
		status: args.status,
		additional: args.additional,
	}).save();

	const newUserWorkdata = await new context.models.UserWorkData({
		userId: newUser.id
	}).save();
	
	newUser.set({ userProfileData: newUserProfileData._id, userWorkData: newUserWorkdata._id });
	newUser.save();

	let response: IAuthRegisterResponse;

	if (newUser && newUserProfileData && newUserWorkdata) {
		response = { success: true };
	} else { 
		response = { success: false };
	}
	
	return response;
}

const resolvers: IResolverMap = {
	Mutation: {
		login: loginResolver,
		register: registerResolver
	}
}

export default resolvers;