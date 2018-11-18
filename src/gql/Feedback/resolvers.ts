import IFeedback from '../../interfaces/models/IFeedback';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const FeedbacksResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IFeedback> => {
	return await context.models.Feedback.find();
};

const FeedbackResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IFeedback> => {
	return await context.models.Feedback.findById(args.id);
};

const createFeedbackResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IFeedback, context: IResolverContext): Promise<IFeedback> => {
		const newFeedback = await new context.models.Feedback({
			updatedAt: args.updatedAt,
title: args.title,
description: args.description,
type: args.type,
category: args.category,
tags: args.tags
		}).save();

		if (newFeedback) {
			return newFeedback;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		Feedbacks: FeedbacksResolver,
		Feedback: FeedbackResolver
	},
	Mutation: {
		createFeedback: createFeedbackResolver
	}
}

export default resolvers;

