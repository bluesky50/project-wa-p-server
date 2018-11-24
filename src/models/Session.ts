import mongoose from 'mongoose';
import ISession from '../interfaces/models/ISession';

export interface ISessionDocument extends mongoose.Document, ISession {}

export interface ISessionModel extends mongoose.Model<ISessionDocument> {}

const SessionSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	access: {
		type: String,
		required: false,
		default: 'private',
		minlength: 1,
		maxLength: 24
	},
	visibility: {
		type: String,
		required: false,
		default: 'default', // could be 'hidden',
		minlength: 1,
		maxLength: 24
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'Project'
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'User',
	},
	participants: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
		default: [],
		required: false,
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

const Session: ISessionModel = mongoose.model<ISessionDocument, ISessionModel>('Session', SessionSchema, 'Sessions');

export default Session;

