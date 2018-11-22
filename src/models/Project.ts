import mongoose from 'mongoose';
import IProject from '../interfaces/models/IProject';

export interface IProjectDocument extends mongoose.Document, IProject {}

export interface IProjectModel extends mongoose.Model<IProjectDocument> {}

const ProjectSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: 'today',
		maxLength: 24,
		minLength: 1
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
		default: '',
		maxLength: 24,
		minLength: 1
	},
	description: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	features: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProjectFeature'
		}],
		required: false,
		default: [],
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
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const Project: IProjectModel = mongoose.model<IProjectDocument, IProjectModel>('Project', ProjectSchema, 'Projects');

export default Project;

