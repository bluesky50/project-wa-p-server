import IUser from '../../interfaces/models/IUser';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const UsersResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IUser> => {
	return await context.models.User.find();
};

const UserResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IUser> => {
	return await context.models.User.findById(args.id);
};

const createUserResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IUser, context: IResolverContext): Promise<IUser> => {
		const newUser = await new context.models.User({
			updatedAt: args.updatedAt,
title: args.title,
description: args.description,
type: args.type,
category: args.category,
tags: args.tags
		}).save();

		if (newUser) {
			return newUser;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		Users: UsersResolver,
		User: UserResolver
	},
	Mutation: {
		createUser: createUserResolver
	}
}

export default resolvers;

