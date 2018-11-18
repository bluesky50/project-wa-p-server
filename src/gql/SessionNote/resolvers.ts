import ISessionNote from '../../interfaces/models/ISessionNote';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const SessionNotesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISessionNote> => {
	return await context.models.SessionNote.find();
};

const SessionNoteResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISessionNote> => {
	return await context.models.SessionNote.findById(args.id);
};

const createSessionNoteResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISessionNote, context: IResolverContext): Promise<ISessionNote> => {
		const newSessionNote = await new context.models.SessionNote({
			updatedAt: args.updatedAt,
title: args.title,
description: args.description,
type: args.type,
category: args.category,
tags: args.tags
		}).save();

		if (newSessionNote) {
			return newSessionNote;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		SessionNotes: SessionNotesResolver,
		SessionNote: SessionNoteResolver
	},
	Mutation: {
		createSessionNote: createSessionNoteResolver
	}
}

export default resolvers;

