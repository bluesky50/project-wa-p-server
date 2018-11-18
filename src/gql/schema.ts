import _ from 'lodash';

import IDefinition from '../interfaces/gql/IDefinition';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { gql } from 'apollo-server-koa';

import * as authTypeDef from './Auth/typeDef';
import authResolver from './Auth/resolvers';
import * as feedbackTypeDef from './Feedback/typeDef';
import feedbackResolver from './Feedback/resolvers';
import * as exerciseTypeDef from './Exercise/typeDef';
import exerciseResolver from './Exercise/resolvers';
import * as exerciseRequirementTypeDef from './ExerciseRequirement/typeDef';
import exerciseRequirementResolver from './ExerciseRequirement/resolvers';
import * as sessionEventTypeDef from './SessionEvent/typeDef';
import sessionEventResolver from './SessionEvent/resolvers';
import * as projectTypeDef from './Project/typeDef';
import projectResolver from './Project/resolvers';
import * as projectNoteTypeDef from './ProjectNote/typeDef';
import projectNoteResolver from './ProjectNote/resolvers';
import * as projectFeatureTypeDef from './ProjectFeature/typeDef';
import projectFeatureResolver from './ProjectFeature/resolvers';
import * as sessionTypeDef from './Session/typeDef';
import sessionResolver from './Session/resolvers';
import * as featureEventTypeDef from './FeatureEvent/typeDef';
import featureEventResolver from './FeatureEvent/resolvers';
import * as sessionInviteTypeDef from './SessionInvite/typeDef';
import sessionInviteResolver from './SessionInvite/resolvers';
import * as sessionNoteTypeDef from './SessionNote/typeDef';
import sessionNoteResolver from './SessionNote/resolvers';
import * as userTypeDef from './User/typeDef';
import userResolver from './User/resolvers';
import * as userProfileDataTypeDef from './UserProfileData/typeDef';
import userProfileDataResolver from './UserProfileData/resolvers';
import * as userWorkDataTypeDef from './UserWorkData/typeDef';
import userWorkDataResolver from './UserWorkData/resolvers';

const types: Array<string> = [];
const queries: Array<string> = [];
const mutations: Array<string> = [];
const subscriptions: Array<string> = [];

const gqlTypeDefinitionsArray: Array<IDefinition> = [];

gqlTypeDefinitionsArray.push(authTypeDef);
gqlTypeDefinitionsArray.push(feedbackTypeDef);
gqlTypeDefinitionsArray.push(exerciseTypeDef);
gqlTypeDefinitionsArray.push(exerciseRequirementTypeDef);
gqlTypeDefinitionsArray.push(sessionEventTypeDef);
gqlTypeDefinitionsArray.push(projectTypeDef);
gqlTypeDefinitionsArray.push(projectNoteTypeDef);
gqlTypeDefinitionsArray.push(projectFeatureTypeDef);
gqlTypeDefinitionsArray.push(sessionTypeDef);
gqlTypeDefinitionsArray.push(featureEventTypeDef);
gqlTypeDefinitionsArray.push(sessionInviteTypeDef);
gqlTypeDefinitionsArray.push(sessionNoteTypeDef);
gqlTypeDefinitionsArray.push(userTypeDef);
gqlTypeDefinitionsArray.push(userProfileDataTypeDef);
gqlTypeDefinitionsArray.push(userWorkDataTypeDef);

gqlTypeDefinitionsArray.forEach((d: IDefinition): void => {
	if (d.typeDefs) {
		types.push(d.typeDefs);
	}

	if (d.queries) {
		queries.push(d.queries);
	}

	if (d.mutations) {
		mutations.push(d.mutations);
	}

	if (d.subscriptions) {
		subscriptions.push(d.subscriptions);
	}
});

const TypeDefs: string = `
${types.join('\n')}
`;

// const gqlTypeDefs: any = gql`${TypeDefs}`;

const QueryDef: string = `
type Query {
${queries.join('\n')}
}
`;

// const gqlQueryDef: any = gql`${QueryDef}`;

const MutationDef: string = `
type Mutation {
${mutations.join('\n')}
}
`;

// const gqlMutationDef: any = gql`${MutationDef}`;

const SubscriptionDef: string = `
type Subscription {
${subscriptions.join('\n')}
}
`;

// const gqlDefs: Array<string> = [ QueryDef, MutationDef, TypeDefs ];
const allDefs: any = [TypeDefs, QueryDef, MutationDef].join('\n')
const gqlDefs: any = gql`${allDefs}`;
// const typeDefs: Array<string> = types;
const mergedResolvers: IResolvers<any, any> = _.merge(authResolver, feedbackResolver, exerciseResolver, exerciseRequirementResolver, sessionEventResolver, projectResolver, projectNoteResolver, projectFeatureResolver, sessionResolver, featureEventResolver, sessionInviteResolver, sessionNoteResolver, userResolver, userProfileDataResolver, userWorkDataResolver);

// const gqlSchema = makeExecutableSchema({
// 	typeDefs: [ ...gqlDefs, ...typeDefs ],
// 	resolvers: mergedResolvers
// });

export const nonExecutableGqlSchema = {
	typeDefs: gqlDefs,
	resolvers: mergedResolvers
}

// export default gqlSchema;

