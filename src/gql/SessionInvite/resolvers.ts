import ISessionInvite from '../../interfaces/models/ISessionInvite';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const SessionInvitesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISessionInvite> => {
	return await context.models.SessionInvite.find();
};

const SessionInviteResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISessionInvite> => {
	return await context.models.SessionInvite.findById(args.id);
};

const createSessionInviteResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISessionInvite, context: IResolverContext): Promise<ISessionInvite> => {
		const newSessionInvite = await new context.models.SessionInvite({
			updatedAt: args.updatedAt,
title: args.title,
description: args.description,
type: args.type,
category: args.category,
tags: args.tags
		}).save();

		if (newSessionInvite) {
			return newSessionInvite;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		SessionInvites: SessionInvitesResolver,
		SessionInvite: SessionInviteResolver
	},
	Mutation: {
		createSessionInvite: createSessionInviteResolver
	}
}

export default resolvers;

