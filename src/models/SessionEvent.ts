import mongoose from 'mongoose';
import ISessionEvent from '../interfaces/models/ISessionEvent';

export interface ISessionEventDocument extends mongoose.Document, ISessionEvent {}

export interface ISessionEventModel extends mongoose.Model<ISessionEventDocument> {}

const SessionEventSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: 'today',
		maxLength: 24,
		minLength: 1
	},
	sessionId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'Session',
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'User',
	},
	startTime: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	endTime: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
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

const SessionEvent: ISessionEventModel = mongoose.model<ISessionEventDocument, ISessionEventModel>('SessionEvent', SessionEventSchema, 'SessionEvents');

export default SessionEvent;

