import mongoose from 'mongoose';
import IUserWorkData from '../interfaces/models/IUserWorkData';

export interface IUserWorkDataDocument extends mongoose.Document, IUserWorkData {}

export interface IUserWorkDataModel extends mongoose.Model<IUserWorkDataDocument> {}

const UserWorkDataSchema: mongoose.Schema = new mongoose.Schema({
	followedProjects: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		}],
		required: false,
		default: [],
	},
	followedSessions: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		}],
		required: false,
		default: [],
	},
	followedExercises: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const UserWorkData: IUserWorkDataModel = mongoose.model<IUserWorkDataDocument, IUserWorkDataModel>('UserWorkData', UserWorkDataSchema, 'UserWorkDatas');

export default UserWorkData;

