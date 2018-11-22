import mongoose from 'mongoose';
import IProjectFeature from '../interfaces/models/IProjectFeature';

export interface IProjectFeatureDocument extends mongoose.Document, IProjectFeature {}

export interface IProjectFeatureModel extends mongoose.Model<IProjectFeatureDocument> {}

const ProjectFeatureSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: 'today',
		maxLength: 24,
		minLength: 1
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'Project',
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'User',
	},
	title: {
		type: String,
		required: false,
		default: 'pf-dflt-title',
		maxLength: 24,
		minLength: 1
	},
	description: {
		type: String,
		required: false,
		default: 'pf-dflt-desc',
		maxLength: 24,
		minLength: 1
	},
	type: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	category: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	tags: {
		type: [{
			type: String,
			ref: ''
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const ProjectFeature: IProjectFeatureModel = mongoose.model<IProjectFeatureDocument, IProjectFeatureModel>('ProjectFeature', ProjectFeatureSchema, 'ProjectFeatures');

export default ProjectFeature;

