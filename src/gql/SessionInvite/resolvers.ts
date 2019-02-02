import ISessionInvite from '../../interfaces/models/ISessionInvite';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';
import mongoose from 'mongoose';

const SessionInvitesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<ISessionInvite> => {
	return await context.models.SessionInvite.find();
};

const SessionInviteResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<ISessionInvite> => {
	return await context.models.SessionInvite.findById(args.id);
};

const SentInvitesResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<ISessionInvite> => {
		const unknown = 'unknown';
		const unknownUserProfileData = { userAlias: unknown, about: unknown, additional: unknown, status: unknown };
		const userId = context.state.user.id;
		const mongoId = mongoose.Types.ObjectId(userId);
		// return await context.models.SessionInvite.find({ creator: userId });
		const sentInvites = await context.models.SessionInvite.aggregate([
			{ $match: { creator: mongoId } }, 
			{ $lookup: { from: 'UserProfileDatas', localField: 'creator', foreignField: 'userId', as: 'creator' } },
			{ $lookup: { from: 'UserProfileDatas', localField: 'destination', foreignField: 'userId', as: 'destination' } },		
		]);
		
		const results = sentInvites.map((i: any) => {
		
			const newObject = Object.assign({}, i);
			newObject.creator = i.creator[0] || unknownUserProfileData;
			newObject.destination = i.destination[0] || unknownUserProfileData;
			newObject.sessionId = i.sessionId.toString();
			return newObject;
		})
		
		return results;
	}
)

const ReceivedInvitesResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<ISessionInvite> => {
		const unknown = 'unknown';
		const unknownUserProfileData = { userAlias: unknown, about: unknown, additional: unknown, status: unknown };
		const userId = context.state.user.id;
		const mongoId = mongoose.Types.ObjectId(userId);
		// return await context.models.SessionInvite.find({ creator: userId });
		const sentInvites = await context.models.SessionInvite.aggregate([
			{ $match: { destination: mongoId } }, 
			{ $lookup: { from: 'UserProfileDatas', localField: 'creator', foreignField: 'userId', as: 'creator' } },
			{ $lookup: { from: 'UserProfileDatas', localField: 'destination', foreignField: 'userId', as: 'destination' } },		
		]);
		
		const results = sentInvites.map((i: any) => {
		
			const newObject = Object.assign({}, i);
			newObject.creator = i.creator[0] || unknownUserProfileData;
			newObject.destination = i.destination[0] || unknownUserProfileData;
			newObject.sessionId = i.sessionId.toString();
			return newObject;
		})
		
		return results;
	}
)

const createSessionInviteResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: ISessionInvite, context: IResolverContext): Promise<ISessionInvite> => {
		const userId = context.state.user.id;

		const sessionInvites = await context.models.SessionInvite.find({ sessionId: args.sessionId, destination: args.destination, creator: userId });
		
		if (sessionInvites.length > 0) { 
			return sessionInvites[0];
		}

		const session = await context.models.Session.findById(args.sessionId);

		if (session && session.creator.toString() == userId) {
			const newSessionInvite = await new context.models.SessionInvite({
				updatedAt: "today",
				creator: userId,
				destination: args.destination,
				sessionId: args.sessionId,
				title: args.title,
				description: args.description,
				type: args.type,
				category: args.category,
				tags: args.tags
			}).save();
	
			if (newSessionInvite) {
				return newSessionInvite;
			} 
			
			return await Promise.reject();
		}

		return await Promise.reject("Not session creator");
	}
)

const resolvers: IResolverMap = {
	Query: {
		sessionInvites: SessionInvitesResolver,
		sessionInvite: SessionInviteResolver,
		receivedInvites: ReceivedInvitesResolver,
		sentInvites: SentInvitesResolver
	},
	Mutation: {
		createSessionInvite: createSessionInviteResolver
	}
}

export default resolvers;

