import mongoose from 'mongoose';

import debug from '../lib/debugger';
import IOrmAdapter from '../interfaces/class/IOrmAdapter';

import Exercise from '../models/Exercise';
// import ExerciseRequirement from '../models/ExerciseRequirement';
// import FeatureEvent from '../models/FeatureEvent';
// import Feedback from '../models/Feedback';
import Project from '../models/Project';
// import ProjectFeature from '../models/ProjectFeature';
// import ProjectNote from '../models/ProjectNote';
import Session from '../models/Session';
import SessionEvent from '../models/SessionEvent';
// import SessionInvite from '../models/SessionInvite';
// import SessionNote from '../models/SessionNote';
import User from '../models/User';
import UserProfileData from '../models/UserProfileData';
import UserWorkData from '../models/UserWorkData';

export class OrmAdapter implements IOrmAdapter {
	public dbUrl: string;
	private models: { [key: string]: any };

	constructor(dbUrl = '') {
		this.dbUrl = dbUrl;
		this.models = {
			Project,
			Session,
			SessionEvent,
			Exercise,
			User,
			UserProfileData,
			UserWorkData
		}
	}

	public connect() {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.dbUrl);
		mongoose.connection.once('open', () => {
			debug('Connected to database.');
		});
	}

	public disconnect() {
		mongoose.connection.close();
	}

	public getModels() {
		return this.models;
	}

	public getModel(name: string) {
		return this.models[name];
	}
}

export default OrmAdapter;
