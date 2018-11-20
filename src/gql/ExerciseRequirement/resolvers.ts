import IExerciseRequirement from '../../interfaces/models/IExerciseRequirement';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const ExerciseRequirementsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IExerciseRequirement> => {
	return await context.models.ExerciseRequirement.find();
};

const ExerciseRequirementResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IExerciseRequirement> => {
	return await context.models.ExerciseRequirement.findById(args.id);
};

const createExerciseRequirementResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IExerciseRequirement, context: IResolverContext): Promise<IExerciseRequirement> => {
		const newExerciseRequirement = await new context.models.ExerciseRequirement({
			updatedAt: "11/18/2018",
			creator: context.state.user.id,
			exerciseId: args.exerciseId,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newExerciseRequirement) {
			return newExerciseRequirement;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		exerciseRequirements: ExerciseRequirementsResolver,
		exerciseRequirement: ExerciseRequirementResolver
	},
	Mutation: {
		createExerciseRequirement: createExerciseRequirementResolver
	}
}

export default resolvers;

