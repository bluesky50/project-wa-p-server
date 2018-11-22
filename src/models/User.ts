import _ from 'lodash';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import IUser from '../interfaces/models/IUser';

import { createAuthToken, createRefreshToken } from '../utils/tokenHelpers';

export interface IUserDocument extends mongoose.Document, IUser {
	generateAuthToken(): IUserDocument;
	generateRefreshToken(): IUserDocument;
	generateTokens(): IUserDocument;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
	findByAuthToken(userId: string, authToken: string): IUserDocument;
	findByRefreshToken(userId: string, refreshToken: string): IUserDocument;
	findByUsername(username: string): IUserDocument;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: null,
	},
	username: {
		type: String,
		unique: true,
		required: true,
		maxLength: 24,
		minLength: 1,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		maxLength: 24,
		minLength: 1
	},
	password: {
		type: String,
		required: true,
		maxLength: 24,
		minLength: 1
	},
	authToken: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	refreshToken: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	userProfileData: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'UserProfileData',
	},
	userWorkData: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'UserWorkData',
	}
}, { versionKey: false });

UserSchema.set('toJSON', { virtuals: true });

UserSchema.statics.findByAuthToken = function(userId: string, authToken: string) {
	const User = this;
	return User.findOne({
		_id: userId,
		authToken: authToken,
	});
}

UserSchema.statics.findByRefreshToken = function(userId: string, refreshToken: string) {
	const User = this;
	return User.findOne({
		_id: userId,
		refreshToken: refreshToken
	});
}

UserSchema.statics.findByUsername = function(username: string) {
	const User = this;
	return User.findOne({ username });
}

UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const token = createAuthToken(user);
	user.authToken = token;
	return user.save();
}

UserSchema.methods.generateRefreshToken = function() {
	const user = this;
	const token = createRefreshToken(user);
	user.refreshToken = token;
	return user.save();
}

UserSchema.methods.generateTokens = async function() {
	const user = this;
	const authToken = await createAuthToken(user);
	const refreshToken = await createRefreshToken(user);
	user.authToken = authToken;
	user.refreshToken = refreshToken;
	return user.save();
}

UserSchema.pre('save', function(next) {
	const user: any = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

UserSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.password;
	delete obj.authToken;
	delete obj.refreshToken;
	return obj;
}

// UserSchema.methods.toJSON = function() {
// 	const user = this;
// 	const userObject = user.toObject();
// 	const objectFields = ['username', 'email', 'authToken', 'refreshToken', '_id', 'updatedAt', 'userProfileData', 'userWorkData'];
// 	return _.pick(userObject, objectFields);
// }

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema, 'Users');

export default User;

