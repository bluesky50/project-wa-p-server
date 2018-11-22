import mongoose from 'mongoose';
import IUserWorkData from '../interfaces/models/IUserWorkData';

export interface IUserWorkDataDocument extends mongoose.Document, IUserWorkData {}

export interface IUserWorkDataModel extends mongoose.Model<IUserWorkDataDocument> {}

const UserWorkDataSchema: mongoose.Schema = new mongoose.Schema({
	followedProjects: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project'
		}],
		required: false,
		default: [],
	},
	followedSessions: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session'
		}],
		required: false,
		default: [],
	},
	followedExercises: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Exercise'
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const UserWorkData: IUserWorkDataModel = mongoose.model<IUserWorkDataDocument, IUserWorkDataModel>('UserWorkData', UserWorkDataSchema, 'UserWorkDatas');

export default UserWorkData;

